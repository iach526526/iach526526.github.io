---
title: 給我乾淨的 YouTube
date: 2025-03-26 23:31:49
cover: https://img.iach.cc/banner/alexander-shatov-niUkImZcSP8-unsplash.webp
coverWidth: 2000
coverHeight: 600
tags: [Youtube,rss,web-plugin]
categories: [好用軟體]
---
YouTube 應該是大家常常拜訪的網站之一，那裡匯集了各種類型的影片，現在做影片創作就沒有人沒聽過 YouTube ，從學術研究、生活娛樂，甚至是電器維修的影片上面都能找到，這個平台已經算是現代社會文明結晶的一部份了。隨著我衝浪的資歷隨著時間增加，我認識更多我喜歡的創作者，要穩定的收到接收到我關注的創作者的新內容變的愈來愈困難，隨之而來的是演算法幫我在首頁做的主動篩選，現在還有多少人打開 YouTube 會直接無視首頁的推播有目的的到搜尋欄找影片或是查看訂閱列表？

對，訂閱列表，YouTube 有一個「訂閱」功能，搭配小鈴鐺按鈕，當頻道主有新內容上傳的時候會有藍點提示，但不管你有沒有真的看過更新的內容，只要點進去一次就會自動消失；當然也有個通知中心，但容易被洗版，而且我不能像在 email 一樣把看過的內容移出通知中心，也沒有分類功能，非常不友善。

首頁還有個很討厭的缺點，就是演算法會被養壞，不同的時期我會有不一樣的影片觀看種類，如果最近我正在準備考試，可能首頁都是考試相關的線上課程，但有時候我只是想休息一下看看木棉花上傳的最新動畫，儘管他們都會在我的首頁出現，他們甚至會很貼心的優先把我的觀看進度頂上來，但這會讓我的注意力分散，我很確定我想要休息的時候就不會想要看到那些上課的內容；而我想要看開放課程就不應該有過多不相干的影片在首頁干擾我，

我嚴重懷疑 YouTube 會這樣設計是故意的，如此一來你才會有機會使用他的演算法被推播他們希望你看的內容和贊助商廣告，他們只是希望你把時間耗在這個平台上，漸漸的不在乎頻道主和觀眾的連結，影片創作者和使用者都是讓這個平台繼續有流量、廣告收入和維持 YouTube 這個品牌勢力的齒輪，我們不在是主體，這在 shorts 出現後就變得更糟糕了，這些多餘的東西應該從我的 YouTube 消失。

這是在這篇文章我要做的：
- 隱藏首頁
- 隱藏 shorts
- 幫新影片推播分類

儘管這些事情都可以使用 [FreeTube](https://freetubeapp.io/) 這樣的第三方工具或 [YouTube Revanced](https://github.com/ReVanced/revanced-manager)幫 App 上補丁做到相同的功能，但我就是想先改掉原版的網頁精神勝利一下。

> 我也曾經想留在原版的網頁，是 YouTube 把介面改的那麼難用我才開始用第三方程式的，這可不能怪我。

## unhook
unhook 是一個支援 fireFox 、Chrome 和 Edage 的電腦瀏覽器擴充套件，到[官網](https://unhook.app/)選擇使用的瀏覽器安裝就可以了。在擴充套件列表打開擴充套件設定頁面，就有各種選項讓自由的讓我們選擇要隱藏哪些元件。第一個 `Hide home feed` 就是引首頁推薦欄，這樣，乾淨多了吧。

![use unkook Youtube](https://img.iach.cc/clipboard/use-unhook.webp)

除了隱藏首頁，還有一些非常實用的功能，你可以：
- 隱藏所有的 shorts
- 隱藏留言
- 隱藏播放影片的側邊推薦欄
- 隱藏探索（訂閱列表底下的大分類，包括發燒影片、音樂等等的大分類）

## RSS
RSS(Really Simple Syndication) 是一個可以追蹤網站更新的技術，用來在網站更新的時候收到通知和更新的內容，
通常我們會使用 RSS 閱讀器來追蹤部落格、新聞和 podcasts 最新的更新內容。網站會生成包含這一個站點的標題、總結和連結的 XML ，當網站內容更新也會自動更新 XML 的內容，RSS 閱讀器只要檢查有沒有新的東西就可以知道網站有沒有被更新。

透過 RSS 閱讀器拿到的內容非常乾淨，不會有多餘的廣告、花俏的操作介面，就是內容，只要有新的更新，內容都會匯集到你的閱讀器，你也可以透過閱讀器連出去看原文。在閱讀器中，通常你可以把訂閱內容做分類、在主頁也會有所有分類的最近更新，只要沒有新的內容，理論上就不用去逛那個網站，減少無意義的檢索。

YouTube 當然也有提供每個頻道的 RSS ，只是他們設計的非常隱密，你甚至找不到官方的教學，因為他們**不希望你使用這個功能**，如果你不會上他們的網站瀏覽最近的動態，就沒辦法讓用戶黏著度變高，也比較難透過你打開 YouTube 的間去分析你的使用習慣。

你可以使用 [feedly](https://feedly.com/)、[inoreader](https://www.inoreader.com/)、[newsblur](https://www.newsblur.com/) 之類的線上服務來訂閱 RSS，如果是 Mac ，網路上有人推薦[vienna](https://www.vienna-rss.com/)（我沒用 Mac 不太熟），甚至可以用[Newboat](https://newsboat.org/index.html)在終端機中查看 RSS。

YouTube 每個頻道的 RSS 實際上是`https://www.youtube.com/feeds/videos.xml?channel_id=`加上頻道 ID 的組合，這個頻道 ID 可以在頻道首頁檢視原始碼 ctrl+f 搜尋 channel_id 找到對應的值，網路上也有一些[小工具](https://tubepilot.ai/tools/youtube-rss-feed-generator/)允許你貼入頻道首頁連結，自動幫你轉成 RSS feed 放進閱讀器。

如果閒這樣太麻煩，在 feedly 中可以在 create Ai Feed 直接輸入頻道網址，就可以直接訂閱。

![MY-RSS](https://img.iach.cc/clipboard/MY-RSS.webp)

我除了觀看 YouTube 、Ptt、Dacard 等主流網站，還是會有其他追蹤其他獨立網站或個人 blog ，如果你的生活只有上面那些主流網站，我覺得你要反省一下，你到底是在使用網路還是被科技公司用？ RSS 可以給我一個集中的平台管理我觀看的內容。尤其是在追蹤的網頁愈來愈多的時候，總是要讓他們匯集到一個的方讓我方便查看更新。如果網站沒有主動提供 RSS ，也可以上第三方網站手動建立，GitHub 也有一個開源項目在幫網站 RSS 建立，叫做[Rss Hub](https://github.com/DIYgod/RSSHub)，[這是作者的 blog](https://diygod.cc/rsshub-radar?q=rss) ，大推。