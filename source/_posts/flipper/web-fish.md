---
title: 看看我的小海豚今天釣到什麼魚？
date: 2025-04-12 17:36:12
tags: flipper
categories: [科技玩物]
cover: https://img.iach.cc/general/flipper-fish/james-wheeler-HJhGcU_IbsQ-unsplash.webp
---


今天要使用 Flipper 製作假 AP 並送出假的驗證網頁讓連到的人輸入，<!-- more -->你可以送出任何需要輸入帳號密碼並有送出按鈕的網頁，在別人剛連上你的假 AP 的時候誘導他輸入某個平台的帳號密碼，取決於你攻擊的地點和需要的取得的帳號密碼。其中校園網路 sso 的驗證畫面這種無鎖頭、常常需要重連的網站我覺得成功率是最高的，因為如果連免費 wi-fi 突然跳出的 Google 的畫面一看就很可疑。

![](https://img.iach.cc/general/flipper-fish/wi-fiLogin.webp)
## 前置作業（做出驗證網頁）

GitHub 上有一些[範例](https://github.com/bigbrodude6119/flipper-zero-evil-portal/tree/main/portals)提供我們製作釣魚網站的 html ，包括 Google、Apple、Amazon 等等，主要是給一個格式和可執行的範例，在真實世界我很懷疑當有人連上網路驗證頁被要求輸入這些平台的帳號有誰會不疑有他乖乖輸入。

如果你的標的是模仿已經存在的網頁，你可以按圖施工，並按照 GitHub 上告訴我們的 input 格式做出來，也可以直接 f12 把原始碼複製下來加工。


因為要把網頁放進 ESP32 執行，不能用 html 用相對路徑引入外部圖片 、css、JavaScript，所以要把原本嵌入的檔案都放在一個 html 。圖片比較麻煩，因為 esp32 硬體資源有限，我看 GitHub 上別人實際操作都說 ESP32 容許的 html 的長度是有限的，我自己有在想能不能用 SD 卡外接擴充，不過目前手邊沒有 SD 卡，沒法試。

如果你 f12 之後看到網頁塞了很多不相干的 javascript 和 head 有一些很複雜的內容，目前我的作法是自己斟酌刪減一些不影響外觀的內容。

如果你只是想做個簡單的網頁和朋友開個玩笑，可以使用[EvilPortalGenerator](https://github.com/FlippieHacks/EvilPortalGenerator) 這個工具生套用工版，不過他的 .sh 檔案是給 windows 系統跑的 ，Linux 需要先使用 `dos2unix` 轉換路徑的跳脫字元。


### 圖片轉檔

把圖片轉檔你可以把圖片下載下來再到搜尋引擎隨便找一個轉換器去轉，但那樣比較慢又要看廣告，還會把檔案上傳給別人（我可不想讓人知道我為了做了釣魚網站在別人的伺服器留下紀錄）。建議使用 imagemagick 、 inkscape 這類的軟體。

#### 安裝 imagemagick（踩坑）
```
sudo apt-get install imagemagick
```
安裝完後我使用 covert 指令轉檔，但ImageMagick轉檔的時候呼叫了 prtrace ，但我沒有安裝所以報錯了，現在來安裝他。
```bash
$convert logo.ico logo.svg
convert-im6.q16: delegate failed `'potrace' --svg --output '%o' '%i'' @ error/delegate.c/InvokeDelegate/1997.
```

```
sudo apt-get install potrace
```
安裝後再執行一樣的轉檔命令是能成功轉換「檔案」，但 prtrace 沒有識別出顏色，只有單色（黑色）向量圖，果斷放棄折騰，換 inkscape。

#### 使用 inkscape
```
 sudo apt-get install inkscape
```

```
inkscape logo.ico --export-plain-svg=logo.svg
```
執行命令後選擇「內嵌」確定，如此一來才是把圖片 base 後放進去，連結模式只會是相對路徑。
![alt text](https://img.iach.cc/general/flipper-fish/inkscape-dot.webp)

然後把 svg 拖進去 svg viewwr 得到 ```<svg></svg>```，然後把包裹的內容放進網頁傳給 flipper ，但因為 base64 編碼太長了，晶片記憶體滿了會當機，很明顯這種披著 svg 的點陣圖並不管用，必須真的用向量來描述 logo ，幾種參考作法：

1. 自己照著原本的圖片描成 svg
2. 用程式自動轉換成路徑，但會有一點失真
3. 直接去你要攻擊的機構網站找原始向量圖檔

除了第一種方法太花時間我沒有做，另外兩種我試過都
可行的，去網路搜尋 logo 大概不用我教，這裡示範第二種。

要用程式轉成向量路徑，我一樣選擇使用 inkscape，匯入點陣圖圖片後在上方工具列點選 `路徑`→`描繪點陣圖`（shift+alt+b）

![](https://img.iach.cc/general/flipper-fish/2025-04-12-14-05-33.webp)

選自動掃描，依照情況自己調一下參數就可以了，我其實不是很想在這上面琢磨太久，學校的 logo svg 圖案很複雜，其實就算轉檔了加進網頁裡面也很容易多字，看啊，校徽有一大堆鋸齒也是防偽的效果呢（笑！

假使 svg 仍然有點長的話，可以用這 [svgomg](https://jakearchibald.github.io/svgomg/) 或 [svgminify](https://www.svgminify.com/) 壓縮這些路徑。



如果你認真一點，可以連 favicon 也順便做了，但我不建議這樣做，放一張圖已經是極限了，但還是給你語法。
```html
<link rel="icon" type="image/svg+xml"
      href="data:image/svg+xml,[YOUR ENCODED SVG HERE]" />

```
> 參考資料：[stackoverflow-Use inline SVG as favicon](https://stackoverflow.com/questions/66935329/use-inline-svg-as-favicon)


圖片 、css 弄上去後就已經很像了，~~會被這種技倆騙的可能也不會太仔細看~~，目測差不多就夠了，做那麼像我現在也沒有要真的去釣魚。
## 軟硬體需求
### 燒錄 esp32 程式
要使用 flipper GPIO 外接網路開發版才能使用 Wi-Fi 功能，可以直接上官網買網路模組，也可以拿自己的 ESP32 在電腦上燒錄。

- 官網開發版[購買連結](https://shop.flipperzero.one/products/wifi-devboard?srsltid=AfmBOopkYTFvsWRF9inZvpcjI92V10MsijAPjOXVv5BJzvH9LWm98ABz)
- 手動燒錄 Python 程式- [SkeletonMan03-FZEasyMarauderFlash](https://github.com/SkeletonMan03/FZEasyMarauderFlash)
### 使用程式
- wifi maraud 可以

我的 Flipper 韌體[unleashed](https://github.com/DarkFlippers/unleashed-firmware)可以從 app>GPIO>ESP 找到，我記得預設也有這個。
## 匯入 index.html 進 flipper
1. 把做好的 html 換進 flipper 裡面的 `apps_data/evil_portal/`

![](https://img.iach.cc/general/flipper-fish/2025-04-12-14-12-05.webp)

2. 在 wifi maraud 載入要使用的 html

![](https://img.iach.cc/general/flipper-fish/2025-04-12-17-01-32.webp)

set html 出現很多文字報錯，大概都是 html 內容太長了（確定你的線都有插好）

![](https://img.iach.cc/general/flipper-fish/2025-04-12-17-03-20.webp)
![](https://img.iach.cc/general/flipper-fish/2025-04-12-14-32-17.webp)


出現 html set 才是成功

![](https://img.iach.cc/general/flipper-fish/2025-04-12-17-04-22.webp)

## 選擇 AP
加載完後要去選擇你要模仿的目標，這樣等一下 SSID 才會是他的名稱，並且原本的會消失。

1. scan [ap] 放置一下
2. list [ap]，找到並記住要模仿的 AP 編號
3. 到 select [ap] 輸入步驟 2 的 AP 編號
4. EvilProtal [start]
