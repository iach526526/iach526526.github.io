---
title: 我需要一個更好用的駕照題庫刷題程式
date: 2025-05-05 11:19:31
tags:
    - Python
    - pdf
categories: [生活駭客]
cover: https://img.iach.cc/general/drving-license-test/lorie-everly-6rI52gYMcYw-unsplash.webp
coverWidth: 2000
coverHeight: 600
---
最近考完機車駕照接著要練汽車，又要來背學科考題了，上次我是用駕訓班發的書和一個考駕照的 app 隨機出題練習的，書我只有看標誌的部分認正確標誌而已，大部分都是直接給 app 隨機出題，錯的再記答案，根據 app 的紀錄，我只有看過全部題目的 30%，我從開始準備到考駕照只花了一個星期，大概是因為機車題庫有情境考題圖多，很多又是基本常識，加上準備時間短不需要長期記憶，過程沒有太吃力。

然而，當我開始翻閱汽車駕照的題庫時，感覺就不太一樣了，我學怎麼開車就覺得要記好多東西了，題庫裡的內容也更加繁雜，要背這些內容得用更有效率且舒適的方法才行。為什麼提到舒適呢？因為軟體刷題法不舒適啊XD大部分考駕照的 app 開發者都要吃飯養家所以有廣告或付費解鎖無廣告， app 開發過程都不容易可以理解，但我一個窮學生不想出錢也不想花時間看廣告，頻繁開關網路也讓我覺得很煩，因此我想把題目放進 anki 去刷，我當然不會手動去 key 題目。這樣做的好處是我一看就知道的題目就可以設定過較長的時間再出現，省去我重複看到基礎常識的的次數，只專心記我容易寫錯的。

我打算用 Python 去讀文字和答案做成 anki 的閃卡，並生成可以直接匯入 Anki 的 ```.apkg``` 檔案 ，這些功能我很確定 Python 都有現成的套件可以讓我做的更快，但是我在網路上都找不到現成的 csv 可以讓我直接逐行匯入，只好自己來做了。

本篇的流程如下：

- 從[交通部公路局網站](https://www.thb.gov.tw/News_Download.aspx?n=284&sms=12823)下載題庫 PDF
- 讀 PDF 內容輸出成 csv
- 讀取 CSV 並將資料轉換成 ```.apkg```
### 下載檔案
如果你會看我的 blog 大概已經會下載了，你只要選擇你偏好的題庫語言下載就好。題目有這幾個類別要下載：
- 法規是非題
- 法規選擇題
- 號誌是非題
- 號誌選擇題

不過我發現一件小事情：我的駕訓班課本裡還有「駕駛道德」和「行車檢查」等等雜項題目，但在交通部網站上卻沒有這些資料。雖然有點奇怪，但這應該不會造成太大問題，因為實際考試主要還是從上面四個檔案出題。
## PDF 轉換 CSV
交通部提供的題庫 PDF 檔案很有規律，題目都是一題一題列在表格裡，因此處理起來非常方便。我用 Python 的 ```pdfplumber``` 套件來讀取 PDF，每頁逐列提取表格中的內容當成一題。比較麻煩的是號誌題庫，這就有點難搞了。我後來是想到PDF 放進 Word 另存成網頁，圖片就會被另外解析成資源資料夾放到獨立的資料夾，剛好在沒有其他多於圖片的情況，剛剛好可以用題號正確的對應生成的圖片檔名，雖然不是自己寫程式解決，但有辦法快速達到目標的方法就是好方法。

![word 轉檔畫面](https://img.iach.cc/general/drving-license-test/word-html.webp)

## 讀 CSV 匯出成 anki
我使用 [genanki](https://github.com/kerrickstaley/genanki) 這個在 GitHub 開源的套件逐行讀 csv 匯出 anki 卡片，有圖和沒圖的程式我用了兩個不同的函式處理。基本邏輯就是弄一個 model 物件，定義在 anki 出現的內容，每題內容放在一個 list 塞進去做成一張卡片。

### 範例程式
```python
import genanki

my_model = genanki.Model(
  1380120064,
  'Example',
  fields=[
    {'name': 'Object'},
    {'name': 'Image'},
  ],
  templates=[
    {
      'name': 'Card 1',
      'qfmt': '{{Object}}<br><br>{{Image}}',
      'afmt': '{{FrontSide}}<hr id="answer"><br>',
    },
  ])

my_note = genanki.Note(
  model=my_model,
  fields=['JPEG File', '<img src="format.jpg" />'])# 只要檔名

my_deck = genanki.Deck(
  2059400191,
  'Example')

my_deck.add_note(my_note)

my_package = genanki.Package(my_deck)
my_package.media_files = ['D:\\path\\your\\media']# 路徑放這裡

my_package.write_to_file('output.apkg')
```
### 難題
在插入圖片我除錯蠻久的，在設計模板的時候要在 qfmt 放題目，afmt 放答案，複習的時候才會先跳出題目，點選顯示後才顯示正確答案。但我只能在 afmat 裡面放 `{{Image}}`，挪到 qfmt 就報格式錯誤，我反覆確認圖片路徑和格式是否都有齊全，試了相對路徑又改回絕對路徑，看了套件的 issue 和 README 都寫是可以把多媒體格式放在 qfmt ，但我就是不行。

```
Exception: Could not compute required fields for this template; please check the formatting of "qfmt": {'name': 'Card 1', 'qfmt': '{{Question}}<br><img src="{{Image}}">', 'afmt': '<hr id="answer">{{Answer}}<br><small>{{Comment}}</small>', 'ord': 0, 'bafmt': '', 'bqfmt': '', 'did': None}
```
我甚至找了各大文檔讀的比我多的語言模型幫忙除錯，得到的答案都很奇怪。直到我` pip list ` 開始怪工具爛我才發現我一開始在 PyPI 的網頁複製到的安裝指令是非常古老的版本……安裝成最新的之後就...好了= =。
## 成品
經過一番調整後我，總算把這些檔案整理好可以正常來做題複習了，用程式自動做 anki 就是苦一時，爽一世，以後都不用再為了類似的檔案架構去煩惱，雖然短期內好像也沒有其他背交通部題庫的機會，不過交通部的題庫格式汽車、機車、重機好像都差不多，還有多語言可以轉，我以後要是需要一點休閒娛樂想敲敲鍵盤但又不知道要幹嘛或短期迴響不錯的話我再把中文汽車題庫以外的題目補上。
### 如何拿到我做好的 apkg ？
 csv 、apkg 我都放在[我的 GitHub ](https://github.com/iach526526/Drivers-License-Exam-TW) 的 [release](https://github.com/iach526526/Drivers-License-Exam-TW/releases/tag/car) 公開，如果對你有幫助的話請不要吝嗇你的星星，讓這個儲存庫能更容易被搜尋到。