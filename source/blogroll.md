---
title: blogroll | 部落滾
layout: about
date: 2025/08/28
comments: false
---

又叫做部落格名冊、部落卷，收錄我常造訪的網站，大部分超連結的引用是我自發性的，沒有特別到對方的站要求互貼，只是希望能藉由我的足跡帶領其他人發現寶藏 blog。
<br>
部落滾這個名字來自於 [ivon](https://ivonblog.com) 的翻譯，聽著覺得很可愛就也跟著這麼叫。

---

<div id="opml-list">載入中…</div>
<link href="https://font.emtech.cc/css/NerdMono" rel="stylesheet" />

<style>
button{
    font-family:NerdMono;
    color: #dd630cff
}
</style>
<script>
(async () => {
  const res = await fetch('./feeds.xml');
  const text = await res.text();
  const xml = new DOMParser().parseFromString(text, "text/xml");

  function escapeHtml(s){
    return (s ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  function cleanDescription(s, maxLen = 160) {
    if (!s) return '';
    const text = s.replace(/<[^>]*>/g, '').trim();
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen) + '…';
  }

  function collectFeeds(node, out = []) {
    const children = Array.from(node.children).filter(n => n.tagName === 'outline');
    for (const o of children) {
      const xmlUrl = o.getAttribute('xmlUrl');
      if (xmlUrl) {
        out.push({
          title: o.getAttribute('text') || '(no title)',
          xmlUrl,
          htmlUrl: o.getAttribute('htmlUrl') || '',
          description: o.getAttribute('description') || ''
        });
      }
      collectFeeds(o, out);
    }
    return out;
  }

  const body = xml.querySelector('opml > body');
  let feeds = collectFeeds(body);

  // 去重
  const seen = new Set();
  feeds = feeds.filter(f => {
    if (seen.has(f.xmlUrl)) return false;
    seen.add(f.xmlUrl);
    return true;
  });

  // 排序（可刪）
//   feeds.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hant'));

  let html = `<p>共 <strong>${feeds.length}</strong> 個訂閱。</p>`;
  html += `<ul class="feed-list">`;

  for (const f of feeds) {
    const desc = cleanDescription(f.description);

    html += `
      <li class="feed-item">
        <div class="feed-title">${escapeHtml(f.title)}</div>

        ${desc ? `
          <div class="feed-desc">
            ${escapeHtml(desc)}
          </div>` : ``}

        <div class="feed-actions">
          ${f.htmlUrl ? `
            <a class="feed-site"
               href="${escapeHtml(f.htmlUrl)}"
               target="_blank"
               rel="noopener">
              🌐 網站
            </a>` : ``}

          <button class="feed-rss"
                  data-rss="${escapeHtml(f.xmlUrl)}"
                  title="複製 RSS 連結">
             \ueb47 RSS
          </button>
        </div>
      </li>
    `;
  }

  html += `</ul>`;
  document.getElementById('opml-list').innerHTML = html;

  // RSS 按鈕：點擊複製
  document.querySelectorAll('.feed-rss').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.rss);
        btn.textContent = '✔ 已複製';
        setTimeout(() => btn.textContent = '📡 RSS', 1200);
      } catch {
        window.prompt('複製這個 RSS：', btn.dataset.rss);
      }
    });
  });
})();
</script>