---
permalink: /free-webfont/
title: emfont-中文開源網頁字型解決方案
date: 2025-06-04 20:23:20
tags:
    - 前端開發
    - 字型
categories: [好用軟體]
cover: https://img.iach.cc/general/free-webfont/emfont-index.webp
---
## 為什麼會需要用到網頁字型？

在平面設計中，字型是一個很重要的視覺呈現要素，選擇正確的字型能讓人更容易沈浸在你的作品中，相信我，沒有人會喜歡黑字新細明體配上黃色
背景，那簡直是美感上的災難。

而在網頁設計中，字型同樣扮演著關鍵角色。但我們經常會遇到這種情況：在 Illustrator、Figma、Photoshop 上拉得很開心，套用漂亮的字型與排版風格；但一到實際開發階段，卻發現困難重重。要開始設計網站的時候，怎麼讓客戶端的裝置能顯示出指定的字型就不是一件容易的事：因為網站是設計給很多人同時在各種不同的裝置打開的，每個作業系統和瀏覽器都會有自己預設的字型，如果網站上指定的客戶的裝置沒有安裝，就會顯示預設的字型，大家看到的內容可能會不一樣，這不是我們想要的。

要不然？就在加載網站的時候一起下載字型可不可以呢？不行～大部分的字型授權都有指定用途，你在平面設計軟體設計的字最多最多就是拿來輸出成印刷品，在網站上使用得買另外 webfont 的授權，比較有名的像是[justfont](https://webfont.justfont.com/fonts)、[文鼎雲字庫](https://ifontcloud.com/index/introduce_package.jsp#web)都有這類的服務，除了付費還要在網頁主機裝驗證伺服器之類的，如果只是想做點小專案、個人或小組織的網頁不是很推薦這樣做。

## 網路上免費使用的網頁字型
### Google Font
這是一個 Google 提供的線上字型服務，只要到官網挑選「想要的字型」複製 embed code 貼到[網頁](https://fonts.google.com/)上就以使用 CSS 套用了。不過對於中文字型來說，你只有 Noto 這個和 Adobe 合作推出的開源字型可以使用，沒有那麼多變化可以玩。

![google-font](https://img.iach.cc/general/free-webfont/google-font.webp)

<sub>你可以直接複製以上內容到網頁使用 Google font</sub>

### emfont
[emfont](https://github.com/emfont/emfont/) 主要提供線上中文字型服務，收錄了常用的繁體、簡體開源字型，有些字型亦支援日文與韓文，使用範圍廣泛。字型類型涵蓋標楷、宋體、圓體、點陣字，以及特殊用途的精靈（注音）文、表情符號（Nerd Font）等。大部分中文字型同時覆蓋基礎英文字母，因此即使是純英文網站也能直接使用。

![emfont 首頁](https://img.iach.cc/general/free-webfont/emfont-index2.webp)

### 使用範例
##### 基礎使用
根據官網使用說明，只要在 html 加載後執行下面這段 code 呼叫emfoont 的函式庫就可以套用字型。

```javascript
<script type="module">
    import "https://font.emtech.cc/emfont.js";
    emfont.init();
</script>
```

在文字標籤或 div 內應該按照字型支援列表套用 class ，如果是 hexo 這類 blog 框架也可以在 markdown 先寫好在特定幾行套用特殊字型，
就像下面這樣：

```html
<p class="emfont-Cubic11">
    這個段落使用了 emfont 的 Cubic11 字型
</p>
```

<p class="emfont-Cubic11">
    這個段落使用了 emfont 的 Cubic11 字型
</p>


如果用了一些框架像是 hexo 、hugo ，需要在原始碼定義 header 結構的地方引入 emfont 函式庫，接著比對渲染後的結構，修改主題本身的原始碼，幫他多上 class 就完成了。建議優先使用變化較大的手寫字型或點陣體來確認變化。
##### 調整字重
在 class 後面加數字，[官網字型預覽](https://font.emtech.cc/fonts/) 可以看該字型支援的字重，預設不用填寫 emfont 會自己抓。
```html
<p class="emfont-PopGothicTC-700">
    這個段落使用了 emfont 的大波浪圓體字型，字重 700
</p>
```
<p class="emfont-PopGothicTC-700">
    這個段落使用了 emfont 的大波浪圓體字型，字重 700
</p>
<p class="emfont-PopGothicTC-400">
    這個段落使用了 emfont 的大波浪圓體字型，字重 400
</p>

##### 極致壓縮

在流量上 emfont 非常貼心的提供字體壓縮方案以供選擇，有極致模式和一般模式，可以依照需求選擇：
- 極致壓縮模式
會在請求後即時運算生成，生成後會在伺服器暫時保留一陣子。適合用於網站導覽的大標或選單這種不會時常變動的內容。
- 一般模式
會根據所使用的字傳送預先切割過的子字型包逐包加載，會多下載少部份相近字頻的字。
建議使用框架中字多且常變動的內文區塊或使有使用者在 input box 輸入後在 input box 之外標籤修改內容即時呈現的內文，像是 emfont 
的[字型預覽](https://font.emtech.cc/fonts)屬於後者就是使用一般方式。


> 字型分包的邏輯是字頻，但中英文是分開的，如果是純英文網頁的話也是可以直接使用一般模式，不需要極致壓縮

儘管 emfont 已經盡量簡少需要傳輸的字型，不過當網速真的很慢，慢到連[阿部寬的網頁](http://abehiroshi.la.coocan.jp/)裡頭的照片
都沒有瞬間加載出來的話，emfont 可幫不上忙。 
##### 特殊字型
######  Nerd font

值得注意的是：有一套叫做 Nerd font 的開源字型使用方式比較特別，因為這主要是提供表情符號的字型，建議到[ Nerd font 官網](https://www.nerdfonts.com/cheat-sheet)cheet sheet 挑好 icon 後選擇複製 「icon」貼到 html 文本中，結果就會這這樣：

```html
<p class="emfont-Nerd">
    這個段落使用了 emfont Nerd font 這邊會顯示出一個 GitHub icon 「」
</p>
```

<p class="emfont-Nerd">
    這個段落使用了 emfont Nerd font 這邊會顯示出一個 GitHub icon 「」
</p>

---

以上就是我目前找到覺得不錯的網頁字型解決方案和它們基礎使用方式，推薦給各位。

## 參考資料
- [emfont 官方文檔](https://font.emtech.cc/docs)

