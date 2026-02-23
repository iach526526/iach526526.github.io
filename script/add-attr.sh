#!/bin/bash
for file in *.md; do
  # 跳過不是一般檔案的項目
  if [[ -f "$file" ]]; then
    # 檢查檔案是否至少有 4 行
    line_count=$(wc -l < "$file")
    if (( line_count >= 2)); then
      # 在第4行之後插入 layout: book-content
      sed -i '2alayout: book-content' "$file"
      echo "✅ 已修改：$file"
    else
      echo "⚠️  跳過（行數不足 4 行）：$file"
    fi
  fi
done

