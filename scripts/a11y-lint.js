'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const issues = [];
const strictHeadingOrder = process.env.A11Y_STRICT_HEADINGS === '1';

const SOURCE_EXTENSIONS = new Set(['.md', '.html', '.ejs', '.jsx']);
const PUBLIC_HTML_SKIP_PARTS = [
  `${path.sep}lib${path.sep}`,
  `${path.sep}css${path.sep}`,
  `${path.sep}js${path.sep}`
];

function walk(dir, predicate, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walk(fullPath, predicate, files);
      continue;
    }

    if (!predicate || predicate(fullPath)) files.push(fullPath);
  }

  return files;
}

function rel(file) {
  return path.relative(root, file);
}

function lineStarts(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === '\n') starts.push(i + 1);
  }
  return starts;
}

function positionFromIndex(starts, index) {
  let low = 0;
  let high = starts.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (starts[mid] <= index) low = mid + 1;
    else high = mid - 1;
  }

  const line = high + 1;
  const column = index - starts[high] + 1;
  return { line, column };
}

function addIssue(file, line, column, code, message) {
  issues.push({ file: rel(file), line, column, code, message });
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function getAttr(tag, attr) {
  const pattern = new RegExp(`\\s${attr}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = tag.match(pattern);
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? '';
}

function stripHtml(text) {
  return text
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#x?[0-9a-f]+;/gi, ' ');
}

function stripMarkdownInline(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/`[^`]*`/g, '')
    .replace(/[*_~#>]/g, '')
    .trim();
}

function isImageOnlyMarkdown(text) {
  const withoutImages = text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/<img\b[^>]*>/gi, '')
    .trim();
  return withoutImages.length === 0 && /!\[[^\]]*\]\([^)]+\)|<img\b/i.test(text);
}

function lintFrames(file, text) {
  const starts = lineStarts(text);
  const framePattern = /<i?frame\b[\s\S]*?>/gi;
  let match;

  while ((match = framePattern.exec(text)) !== null) {
    const tag = match[0];
    const title = getAttr(tag, 'title');
    if (title === null || title.trim() === '') {
      const pos = positionFromIndex(starts, match.index);
      addIssue(
        file,
        pos.line,
        pos.column,
        'HM1410201C',
        'iframe/frame needs a non-empty title attribute.'
      );
    }
  }
}

function lintMarkdownHeadings(file, text) {
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    const atx = line.match(/^(#{1,6})\s*(.*?)\s*#*\s*$/);
    if (!atx) return;

    const content = stripMarkdownInline(stripHtml(atx[2]));
    if (content === '') {
      addIssue(
        file,
        index + 1,
        1,
        'HM1130100C',
        'Markdown heading has no readable text.'
      );
    }
  });

  for (let i = 1; i < lines.length; i += 1) {
    if (!/^\s*(?:={3,}|-{3,})\s*$/.test(lines[i])) continue;
    if (!isImageOnlyMarkdown(lines[i - 1])) continue;

    addIssue(
      file,
      i + 1,
      1,
      'HM1130100C',
      'Setext heading underline turns the previous image-only line into an empty heading.'
    );
  }
}

function lintGeneratedHeadings(file, text) {
  const starts = lineStarts(text);
  const headings = [];
  const headingPattern = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match;

  while ((match = headingPattern.exec(text)) !== null) {
    const level = Number(match[1]);
    const body = match[2];
    const readableText = stripHtml(body).trim();
    const pos = positionFromIndex(starts, match.index);
    headings.push({ level, line: pos.line, column: pos.column });

    if (readableText === '') {
      addIssue(
        file,
        pos.line,
        pos.column,
        'HM1130100C',
        'Generated heading has no readable text.'
      );
    }
  }

  if (headings.length === 0) {
    addIssue(
      file,
      1,
      1,
      'HM1130100C',
      'Generated page has no heading elements.'
    );
    return;
  }

  if (!strictHeadingOrder) return;

  for (let i = 1; i < headings.length; i += 1) {
    const previous = headings[i - 1];
    const current = headings[i];
    if (current.level > previous.level + 1) {
      addIssue(
        file,
        current.line,
        current.column,
        'HM1130100C',
        `Heading level jumps from h${previous.level} to h${current.level}.`
      );
    }
  }
}

function isSourceLike(file) {
  return SOURCE_EXTENSIONS.has(path.extname(file));
}

function isPublicPage(file) {
  if (path.extname(file) !== '.html') return false;
  if (PUBLIC_HTML_SKIP_PARTS.some(part => file.includes(part))) return false;
  return true;
}

function main() {
  const sourceFiles = [
    ...walk(path.join(root, 'source'), isSourceLike),
    ...walk(path.join(root, 'themes', 'nexmoe', 'layout'), isSourceLike)
  ];

  for (const file of sourceFiles) {
    const text = read(file);
    lintFrames(file, text);
    if (path.extname(file) === '.md') lintMarkdownHeadings(file, text);
  }

  for (const file of walk(path.join(root, 'public'), isPublicPage)) {
    lintGeneratedHeadings(file, read(file));
  }

  if (issues.length > 0) {
    console.error(`a11y lint found ${issues.length} issue(s):`);
    for (const issue of issues) {
      console.error(`${issue.file}:${issue.line}:${issue.column} [${issue.code}] ${issue.message}`);
    }
    process.exitCode = 1;
  } else {
    console.log('a11y lint passed.');
  }
}

if (require.main === module) main();

module.exports = { main };
