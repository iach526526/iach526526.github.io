---
title: 如何開始遊玩 Flipper ?
tags: 
    - flipper
cover: https://img.iach.cc/general/flipper/start-flipper-banner.webp
coverHeight : 400
coverWidth : 1200
categories: 
    - [科技玩物]
    - [精選]

date: 2025/8/1 13:22
---
# 什麼是 Flipper Zero？
Flipper zero 是一個集合眾多功能的開源硬體工具，根據[官網](https://flipperzero.one/)的介紹，你可以透過 Flipper 入門電子系統的開發和使用。製作團隊受到 pwnagotchi [^1]這個樹莓派電子寵物專案啟發，除了提供各種方便的工具和軟體以外的，它還是一隻電子寵物，Flipper zero 裡面住了一隻賽博海豚，它會根據你使用 Flipper 的行為豐富的反應，在 Flipper 的各種程式裡面都會看到他。

Flipper 使用單色 LCD 螢幕和六顆按鈕和作為使用者輸入，外觀十分好看，電路都有好好用殼包起來不會放在包包就和你的鑰匙短路。一開始官方推出黑色版本，現在官網只能買到圖片中白色的。外殼的[建模檔案](https://github.com/flipperdevices/flipperzero-3d-models)公開在網路上鼓勵大家客製化，因此在社群中能看到 3D 列印、透明版等各種不同的版本，花樣很多。

![Flipper 硬體](https://img.iach.cc/general/flipper/f-hard.webp)


[^1]: 這個專案設計了一個愛吃 Wi-Fi 的交握封包的電子寵物（然後可以幫你破解密碼），你需要天天餵食不然他會不高興。我第一次看到這個專案是在[炬峰的頻道](https://www.youtube.com/watch?v=VJVso7q-pE0)，可以去看看然後留言催更他，這傢伙消失 4 年了。
# 如何購買 Flipper ？
[官網](https://shop.flipperzero.one/)可以直接下單，如果要玩建議直接從官網下單，連配件可以一起買好，配件跟本體一起買才有免運。官方的寄件服務不會到台灣，需要讓官方宅配送到集運倉再轉運，我使用 [buy&ship](https://www.buyandship.com.tw/)這個集運服務，送到波特蘭免稅倉庫再由他們送到台灣，運費一磅 170 台幣，Flipper 沒有很重就是 170 。這家的集運服務我用了很多次，HackClub 的獎品都是走這條送來的，寄到集運倉後兩週就會送到你手中，寄件很穩很快，一試成主顧[^2]。

當然蝦皮、掏寶這種網購平台也有人在賣，但十之八九都是像我們這樣直接集運買入或是在美國有地址可以收件，出國就順便帶回來。上面的價格我有看過，都比官網的價格換成台幣還要貴很多，誇張一點的價格還會翻到快兩倍，誰買誰盤子。

![flipper shop](https://img.iach.cc/general/flipper/buy-flipper.webp)


官網訂購為了防黃牛有一套自己的偵測機制，他很容易就不出你的單，會有這種情況大概是帳單地址或信有卡本身有問題，有這種情況請確定你已經把付款地址改成集運倉的英文地址，接著就是換張信用卡，最後用有刷成功。[^3]

![flipper order canceled](https://img.iach.cc/general/flipper/order-canceled.webp)

[^2]: 前提是你要記得即時在 EzWay 實名委任，不然會卡在海關

[^3]: 其實在 2024 參加 HackClub 的活動就有拿到一台 Flipper 了，今年再買是跟學長的單買一些配件。

# 用途
Flipper 作為一隻電子寵物，除了不能砍樹、衝浪、碎岩[^4]，其實和路邊收服的寶可夢有得比。它專精在電子訊號處理，可以帶你穿牆（突破門禁）、發射波導（無線電、紅外線、晶片訊號）、唱歌（播放音樂）甚至是玩遊戲，可以說是麻雀雖小，五臟俱全。

這篇文章我就以硬體配置的示意圖從第三層逐一往下講起！大概介紹一下功能給大家開個眼界。詳細使用方式待更新。

![flipper 內部結構](https://img.iach.cc/general/flipper/flipper-inside.webp)

[^4]在寶可夢系列遊戲中，需要克服地圖上的地形障礙就要培養特定招式的寶可夢來幫忙

## [GPIO](https://docs.flipper.net/gpio-and-modules)

就是一大堆針腳，提供 3、5 伏特電壓供電，還有一些特殊角位可以傳串列資料，常常用來外接開發版，或當作電源供應器做一些基本電學實驗。提供腳位輸入輸出能做的事情太多太多了，無法一一列舉。你甚至可以自己接冷門的感測器再弄個 Flipper App 去操控。我[最近](./web-fish)有摸過 Wi-Fi 模組，就是把 ESP32 接上去當成 AP 做一些無線網路相關的攻擊和偵測這樣。前面講到寶可夢， flipper 上有一個程式叫做[Pokemon Trade Tool](https://awesome-flipper.com/application/lab.flipper.net/gpio/pokemon/)可以模擬 Game Boy 和你的遊戲機交換寶可夢

大多數的花活都是利用和 GPIO 角位還有各種感測器的交互玩出來的，在 flipper [reddit](https://www.reddit.com/r/flipperzero/) 版會很常看到頭上長板子的 flipper showcase ，這坑很深，自由度很高。

## [Sub GHz](https://docs.flipper.net/sub-ghz)
就是無線電，這個技術你通常拿來開汽車車門、鐵門遙控器看到，當然還有無線電對講機。Flipper 可以偵測、發送這些信號。

## Low-power MCU-STM32WB55
這是低功耗藍芽晶片，用來和手機 App 連線操作、操控其他藍芽設備的。你可以拿來當作簡報筆、播放器、手機遠端快門、 Bad USB 甚至是[電腦資源監視器](https://www.reddit.com/r/flipperzero/comments/1khob43/turn_your_flipper_zero_into_a_pc_performance/)來用。

## [IR Transceiver](https://docs.flipper.net/infrared)
用來接收、發送紅外線信號，可以拿來當成萬用\備用遙控器來用，軟體也有紅外線字典（你也可以自己做）來操作生活中的家電。

<sub>~~如果你有兩台 Flipper ，你可以和朋友玩紅外線槍戰~~</sub>

## [iButton Pad](https://docs.flipper.net/ibutton)

電子鑰匙，通常會拿來當作門禁，台灣比較少看見這個，我也沒有實際玩過，沒辦法多說什麼。

## Antenna Board
讀寫 [NFC](https://docs.flipper.net/rfid) 和 [RFID](https://docs.flipper.net/rfid) ，這絕對會是你在 Flipper 最常用的功能，可以自己作識別證、飯店鑰匙（個人備用，退房即刪除，我們是好駭客）或是做 NFC 連結寫入卡片製作電子名片。


# 更多資訊
這就是 Flipper 硬體上粗淺的介紹，如果你想要開始玩 Flipper 的話可以加入官方 [Discord](https://flipperzero.one/discord)、瀏覽[ awesome-flipper.com ](https://awesome-flipper.com/)還有[ Reddit ](https://www.reddit.com/r/flipperzero/)看大家的 showcase 和詳讀文檔。在 Flipper 上主要的硬體溝通其實 flipper 韌體底層都幫你處理好了，電子訊號的儲存都會被簡化為文字檔紀錄 16 進位數字，使的你可以較容易從電子訊號裝置背後的協定和主從溝通方式開始重新認識生活中這些電子裝置。缺點就是離開 flipper 你可能不會到電子材料拿了材料就能馬上在嵌入式系統復刻這些功能，不過也不是每個人都需要學這個，有興趣有時間再繼續深入研究到韌體開發就好。

## 持續學習的管道
最後推薦幾個我常看的專門講 Flipper 的 YouTuber:

- [Derek Jamison](https://www.youtube.com/channel/UCtSFxdKGBDrYDKzckUQOtoA)：深入探討技術，比較硬核，但可以摸到更多好玩的技術，不只是個腳本小子
- [Talking Sasquach](https://www.youtube.com/channel/UCUoJk48pujh29p8zLsnD5PQ):大眾化一些，縮圖也都做的美美的，沒有 Flipper 也可以當娛樂影片看，資訊小白友善。
- [官方宣傳頻道](https://www.youtube.com/channel/UCfKVWB_pOfsY-HQ2siMBn6g):內容不多，可以看 showcase 認識 flipper 的基礎功能。

主要討論資源都還是在 GitHub 、 Discord 社群、[Reddit](https://www.reddit.com/r/flipperzero/) 還有 Flipper lab 裡面，可以多用關鍵字找找。

![flipper feature:source:Flipper offical Discord bot](https://img.iach.cc/general/flipper/flipper-can.gif)