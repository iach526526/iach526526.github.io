---
title: 用 Flipper Zero「畫圖」？！ ASCII Art 繪圖入門
prelink: /bad-usb-ascii-art
cover: https://img.iach.cc/general/flipper/bad-usb-ascii.webp
coverHeight : 600
coverWidth : 1200
description: '這年頭留給繪圖區的工具不多了，今天要用海豚機畫圖'
keywords: flipper,bad usb
categories: 
    - [科技玩物]
tags: 
  - flipper
---
上禮拜在[營隊](../../2025/7-9/huisun)打開我畫 ASCII art 的興趣，回家後又再研究一下有效率產圖的方式，今天分享我這幾天用 Flipper zero 畫圖的心得。

## Bad USB
Flipper 上的 Bad USB 功能，其實就是模仿 RUBBER DUCKY 這個裝置的功能，讓 Flipper 用 USB 或藍芽連結其他裝置後可以模擬鍵盤或滑鼠這類人機介面（HID）的動作，藉此執行一段預先撰寫好的腳本。


Bad USB 這個概念在 2014 年的 Black Hat Talk 被提出，原型是一個可用的 USB 儲存空間接上一個很簡單的 MCU，實際接上後使用者確實會看到 USB 的空間，而被燒在 MCU 韌體裡面的腳本就會在你的電腦偷偷打一些東西，可能是下載某些惡意腳本跑起來之類的，來路不明的隨身碟不要隨便插。在 bad USB 這個概念發表之前就有 RUBBER DUCKY ，但起初它只是被視為一種新的人機介面裝置。隨著 BadUSB 概念的發表，他們兩個的概念與用途也逐漸被並列討論、甚至混用名稱。


所謂的「BadUSB 攻擊」本質上就是將一段預先寫好的腳本，透過模擬鍵盤或滑鼠的方式輸入到電腦中執行。恐怖之處在於，這種攻擊方式不需要先有任何惡意檔案存在於電腦硬碟，因此無法被一般防毒軟體察覺，作業系統甚至以為是「你自己在打字」。

你可以想像成有一個駭客搶了你的電腦開始輸入你看不懂的指令，之後會發生什麼事...就不用我多說了。

### Bad USB 還能做什麼？
Bad USB 其實等同於得到一個「會自動打字的機器人」，插上裝置並觸發後，它就會自動開始輸入文字。我們不一定要拿他來執行惡意腳本，還是可以拿來做一些正當用途，例如在多台電腦用指令安裝軟體[^1]、或是開文字編輯器畫圖之類的。畫圖的視覺效果也很棒，今天我就要分享這個，執行惡意腳本以後再說。

[^1]:一直按 GUI 的下一步真的很惱人。其實 Windows 電腦有內建 wget 這個純文字安裝工具可以安裝各種軟體，[winget.run](https://winget.run/)這個網站可以看安裝某個軟體需要打的指令，也就是查軟體在 winget 上的名字。
## 生成 ASCII ART
為了讓 Flipper 可以畫出 ASCII art ，第一步你需要先把 ASCII art 畫出來，當然你可以進去隨便一個文字編輯器打上一堆空白，再用開啟 insert mode 填你要的點，你要這樣做我沒有意見，只不過對於初次體驗 Flipper Bad USB 來說實在沒有必要花太多時間在刻這些圖案，除非你想要做的圖案很複雜像是下面這張有陰影的手指頭，不然簡單的字母或是純線條用工具轉換會比較有效率。



<center>

![ascii 手手](https://img.iach.cc/general/flipper/ascii-hange.webp)
[來源：V A P Z(@vagonparovoz)](https://instagramez.com/reel/C1AZjCFMU26)
</center>

### 轉換工具
#### banner
banner 就是 banner ，最樸實的 ASCII art ，可以顯示拉丁字母，可以用`-c`參數把星號換成別的符號，man page 很短，讀起來很輕鬆，很容易掌握的指令。
```
$ banner iach.cc
                       *                           
  *                    *                           
                       *                           
 **     ****    ****   * ***        ****    ****   
  *         *  *    *  **   *      *    *  *    *  
  *     *****  *       *    *      *       *       
  *    *    *  *       *    *      *       *       
  *    *   **  *    *  *    *  **  *    *  *    *  
*****   *** *   ****   *    *  **   ****    ****  
```

```bash
sudo pacman banner # arch
sudo apt install sysvbanner #Ubuntu
```
我試了兩種版本的 banner ，arch pacman 的 banner 是 [Sverre H. Huseby](https://shh.thathost.com/pub-unix/#banner) 開發的版本，sysvbanner 要簡陋一些，可以調整的參數比較少。不知道他在 apt 叫什麼名字，非 arch 也可以去他的網站上找原始碼回來編譯。
### figlet
```
$ figlet iach.cc
 _            _               
(_) __ _  ___| |__    ___ ___ 
| |/ _` |/ __| '_ \  / __/ __|
| | (_| | (__| | | || (_| (__ 
|_|\__,_|\___|_| |_(_)___\___|

$ figlet -f block.flf iach.cc
                                                        
_|                      _|                                
      _|_|_|    _|_|_|  _|_|_|          _|_|_|    _|_|_|  
_|  _|    _|  _|        _|    _|      _|        _|        
_|  _|    _|  _|        _|    _|      _|        _|        
_|    _|_|_|    _|_|_|  _|    _|  _|    _|_|_|    _|_|_| 
```
更進階一點的 ASCII Art 工具，banner 能做到的他都行，預設是輸出上面這種線條字母，man 很長功能很多。可以用 -f 參數跟著字型檔名稱套用其他風格，字型檔位置可以用 `figlet -I2` 顯示出來，像我就有這些能用。
```
$ls /usr/share/figlet | grep ".flf"
banner.flf
big.flf
block.flf
bubble.flf
digital.flf
ivrit.flf
lean.flf
mini.flf
mnemonic.flf
script.flf
shadow.flf
slant.flf
small.flf
smscript.flf
smshadow.flf
smslant.flf
standard.flf
term.flf
```
### jp2a
這個指令可以把圖片轉成 ASCII art ，原始圖片最好是像 [bad apple](https://www.youtube.com/watch?v=FtutLA63Cp8) 那樣黑白分明的圖片方便程式判斷邊緣，我找了一張 Flipper 官網上公開的設計圖，大致上會長這樣，有些文字高低沒有對齊再自己修。用這個指令其實就可以在平板或紙上先畫好再掃描了，實際的作畫過程會更像在畫畫。如果你喜歡手工用鍵盤刻這些圖案，我還是推薦使用 jp2a 畫草稿，可以幫你節省一開始點出輪廓的時間。
- [GitHub](https://github.com/cslarsen/jp2a)
```
$ jp2a transparent.png --red=1.0 --green=0.0 --blue=0.0 -i --size=90x50
                                                                            MMMMl         
                                                                                :kk,      
                              lllllllllllll                                       MMl     
                        ,,,k               k kkk,,                          kkk,    Mk    
                      ,k           ,,      k     Mkk,,                          K,    K   
                    ll;              lll 'l     .    M.                         ;Ml   Ml  
                  ,k                 k k ;     ,   ,  ;,                    kkk,  Mk  ;M, 
                 lM                 l l l     l     l  Ml                     MM. MMl  MM 
                l                   k kk    ,    ,      M,      ,,,,,,,,       M'  MM  MM 
                ;                  . lM    l      l     MM    llM      Mll                
               k           ,,,,,,,,k k    ,               k,,'            k               
                        ,   kkkkkk  k     M         ,    ,          ,,,kkkM               
                       l  ll      l. l     l      ll   ll          lMMMMMM                
                      . ,    ,,,,   ,  ,     ,,,.    ,.         ,kkMMMMMM                 
                      'l   lOMMMMll  l M            l          lMMMMMMMM                  
                     k.   kMMMMMMMM.  , k        ,            kMMMMMMM                    
                     M'  lMM; MMMMMO  M M       l            OMMMMMMM                     
                     M'  MMMk,MMMMMM  M M   ,,             ,kMMMMMM:                      
                     M'  MMMMMMMMMMM  M M,               ,kMMMMMMM                        
                  l lM'   MMMMMMMMMMl M                 lMMMMMMMM                         
                  k k .k   MM                          kMMMMMMM                           
                'l l l' l  M                          OMMMMMMM                            
                'k k k;, kk                         ,kMMMMMMMK,,,,,,,,,,,,,,              
                ' l l 'MlM                         lMM;      MMM          MMl             
                ' k k 'k M                       ,kMM             ,   ,,,   M             
                  k k '               ,,    ,,,kKMMM          ,,,,k        ,M             
                                        llllMMMMMMMMllllllllll            lM              
                                                                         l                
                                                                       ll;                
                                                                  ,,k                     
                                                               lllM                       
                                                        ,,,,k                             
                                                    ,,kkMMMM                              
                                                  llMMMMMMMM                              
                                                   k M:MMMMM                              
                                                    l 'M MMMl                             
                                                       k k MM                             
                                                                                          
                                                                                          
                                                                                          
                                                                                          
    ,,,,,,,,,,,,,  ,,           ,,  ,,,,,,,,,,,,  ,,,,,,,,,,,,  ,,,,,,,,,,,,  ,,,,,,,,,,,,
    MMMMMMMMMMMM;  MM           MM  MMMMMMMMMMMM' MMMMMMMMMMMM  MMMMMMMMMMM   MMMMMMMMMMMM
   .M             kM           kM  .M       kMM  kM       kMM  kM            kM       KM  
   OMllllllll    lMM          lMM  OMlllllllMM  .MMlllllllMM  lMMllllllll   lMMlllllllM   
  ,M             MM          ,MM  ,M            kM            MM           ,MM      MM;   
 ,M;            kMk,,,,,,,,  MM  ,M;           ,M            kMk,,,,,,,,, ,MM         K,  
 MM             MMMMMMMMMM  'M   MM            M;            MMMMMMMMMMM  MM          ;Ml 
kM                                                                                      Mk
MM                                                                                      MM

```
### 我沒有終端機
~~去安裝啊，什麼爛問題~~，iOS 有 a-shell 、Android 有 Termux，你說手機終端機模擬安裝這些套件有困難？那就 SSH 到你的電腦。

沒，我說笑的，你可以去找一些線上的轉換工具，搜尋 ASCII art convert 就有一卡車，通常那些網頁最終目的是讓你看廣告，使用體驗不太好，這裡給一個開源的沒有廣告的：

- [opensourcetoolkit](https://opensourcetoolkit.com/ascii-generator)
## 在 Flipper 撰寫 Duckyscript
好，現在有 ASCII art 了，我們要讓 Flipper bad usb 照著打出來，新增一個 txt 檔，要寫 Duckyscript 讓 Flipper 照著做。 Duckyscript 語法十分簡單，語法幾乎都是 `<動作指令> <參數>`。根據 Flipper 文檔，要撰寫 Duckyscript 1.0 的語法，Flipper 提供了網頁時光機的備份讓我們回去看橡皮鴨當初的 GitHub wiki 文檔，Flipper devloper 也有對此做一些說明。

- [Duckyscript wiki](https://web.archive.org/web/20220816200129/http://github.com/hak5darren/USB-Rubber-Ducky/wiki/Duckyscript)
- [Flipper devolper](https://developer.flipper.net/flipperzero/doxygen/badusb_file_format.html)

其他指令的功能我就不抄過來了，其他的這篇用不到，也比較少用，你應該要有辦法在需要的時候對照著你的鍵盤看懂它們。這邊就依照情境聊聊會用到哪些。
### 打開 shell/特定程式
希望你不要對快捷鍵感到反感，因為這在 bad usb 中明顯是比用滑鼠操作（對 bad USB 也可以移動滑鼠）還要有效率，至少不太有可能因為螢幕寬度或佈局的問題點錯。
#### Windows
為了做你想做的事，你應該要先開一個文字 shell 或開啟軟體輸入你要做的事情，對於 Windows 來說，win+r 這個快捷鍵可以叫出執行視窗，接著再輸入你要開啟的程式，例如 cmd （命令提示字元）、notepad（記事本）。如果要按下 win+r ，指令是 `GUI r` ，簡單吧？
#### Linux
對於有桌面程式的 Linux ，可能是 ctrl+alt+t 開啟終端機，或是 win 鍵後搜尋 console ，接著按 ENTER 打開搜尋出來的終端機。純文字就沒那麼多事了，愛打什麼就直接輸入就是。
### 輸入文字
後面接著文字，也就是你要把 ASCII art 每一行開頭都加上 STRING ，再接著 ENTER 換行，也可以把 STRING 和 ENTER 指令合併成 STRINGLN 這條指令，那輸入完後就會自動換行。ASCII art  如果很多行，在每一行開頭加這些東西單純複製貼上也會煩死你，我會用 Python 寫一個簡單的腳本處理：
```py
with open("ascii.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

with open("payload.txt", "w", encoding="utf-8") as out:
    for line in lines:
        out.write(f'STRING {line.strip()}\n')
        out.write("ENTER\n")
```
如果你剛好沒有 python 環境（~~那就去用 online editor ~~），你可以打開 vim ：
- 貼上 ASCII art 
- gg 停在第一行行首
- ctrl+v 進入 visual mode
- GG 帶著 visual mode 游標移到最後一行
- I 插入文字
- 輸入 "STRINGLN "
- ESC
按下 ESC 之後你就會神奇的看到每一行都是 STRING 開頭了。

![vim 插入指令](https://img.iach.cc/general/flipper/vim-insert.gif)

### 實際腳本
好了，現在會用到的都講完了，示範一次在 linux 打開 vim 畫個簡單的圖。

```
DELAY 1000
CTRL-ALT t
DELAY 1000
STRING vim
DELAY 1000
ENTER
STRING i
STRINGLN (_) __ _  ___| |__    ___ ___ 
STRINGLN | |/ _` |/ __| '_ \  / __/ __|
STRINGLN | | (_| | (__| | | || (_| (__ 
STRINGLN |_|\__,_|\___|_| |_(_)___\___|
```
注意 DELAY 指令的使用，單位是毫秒，在切換視窗或等視窗開啟最好都放個 delay ，時間你可以自己抓，不用太長，但不能太短，不然腳本會在視窗還沒打開之前就輸入文字（ bad usb 打字就是這麼快）。DELAY 指令也很常用在安裝腳本的時候等待安裝，要等幾秒就是一個保守的感覺，如果你有玩到惡意程式注入就會發現網路上的 bad usb 腳本很多都是執行 curl 去抓腳本下來執行，非常有趣。

你要把下面這個坨指令存成 txt ，用 qflipper 放在 SD 卡、bad usb 的資料夾裡面，就會在 bad usb 程式找到了。

![qflipper bad usb 資料夾](https://img.iach.cc/general/flipper/qfl-badkb-file.webp)

如果想看其他有趣的腳本可以逛逛 [GitHub UberGuidoZ/Flipper](https://github.com/UberGuidoZ/Flipper/tree/main/BadUSB)這個儲存庫，有很多好駭客腳本可以觀摩。