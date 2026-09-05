---
title: opencode 對話紀錄保存問題
description: ""
date: 2026-09-05T07:33:48.349Z
tags: [自動化, AI開發]
categories: [資訊科技]
cover: "https://img.iach.cc/2026/05/3898be927973e23af07703db3a27489e.webp"
permalink: 2026/opencode-session-storge
---

我使用 opencode 已經有一段時間，最近我突然注意到 opencode 會把對話和工具使用紀錄全部記在某個 sqLite 檔案裡面，並且綁定資料夾開啟的路徑，讓我們可以在下次開啟專案後快速回覆對話紀錄或是跟進對話。但因為綁定的是路徑又存在 sqLite ，所以不會進 git。在專案資料夾改名後就要手動搬移或是接受對話紀錄，不然就會變成 session 繼續存在硬碟但永遠沒辦法在 opencode 叫出來，這個問題可有點大麻煩但我暫時沒想到比較好的解決辦法。

我可以在專案刪除之前把會話從 SQLite 匯出成 json ，未來要繼續開發這個專案再手動匯入，但是這很麻煩，而且我也不會想把 AI 對話 commit 進去。那不這麼做又會造成原始碼和 AI 對話勢被放在兩個獨立的地方管理起來很麻煩。

使用這個指令可列出目錄已經不存在但是 opencode 還有 session 和目錄綁定的孤兒 session。

```bash
sqlite3 ~/.local/share/opencode/opencode.db \
  "SELECT DISTINCT directory FROM session;" |
while IFS= read -r dir; do
  [ -d "$dir" ] || echo "$dir"
done
```

然後下面的指令可以看出所有被使用的分支，來看看你的 opencode 幫你存了多少沒用的東西佔據硬碟空間吧！~~這樣你也會看到這些對話以驚人的速度在蠶食你的硬碟空間，這樣你就可以和我一起來焦慮這件事了~~。如果你有不錯的解決方案或管理 session 的技巧，拜託寫信跟我說。

```bash
$ cd .local/share/opencode
~/.local/share/opencode
❯ ls -alh

total 3853656
drwxr-xr-x@ 13 iach  staff   416B  9月  5 15:16 .
drwxr-xr-x   9 iach  staff   288B  4月 15 11:02 ..
-rw-------@  1 iach  staff   2.8K  7月  9 08:27 account.json
-rw-------@  1 iach  staff   2.5K  7月 20 17:38 auth.json
drwxr-xr-x@  6 iach  staff   192B  3月 14 15:51 bin
drwxr-xr-x@ 13 iach  staff   416B  7月  9 08:27 log
-rw-r--r--@  1 iach  staff   1.8G  9月  5 15:14 opencode.db
-rw-r--r--@  1 iach  staff    32K  9月  3 22:42 opencode.db-shm
-rw-r--r--@  1 iach  staff     0B  9月  5 15:16 opencode.db-wal
drwxr-xr-x@  2 iach  staff    64B  5月 20 12:10 repos
drwxr-xr-x@ 29 iach  staff   928B  8月 24 08:44 snapshot
drwxr-xr-x@  4 iach  staff   128B  7月 29 23:04 storage
drwxr-xr-x@  3 iach  staff    96B  9月  4 06:58 tool-output
```

```bash
# 列出有使用 opencode 的目錄
sqlite3 ~/.local/share/opencode/opencode.db "
SELECT directory, COUNT(*) AS sessions
FROM session
GROUP BY directory
ORDER BY directory;
"
```