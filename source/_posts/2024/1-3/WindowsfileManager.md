---
permalink: /WindowsfileManager/
title: 難用的預設，Windows 10 檔案總管調校
date: 2024-02-16 14:35:16
tags:
  - Windows
categories: [資訊科技]
cover: https://img.iach.cc/general/WindowsfileManager/majid-rangraz-xZMghzq01UQ-unsplash.webp
---

今天要來設定檔案總管。這個每天都在使用的小工具預設值使用起來總是有些彆扭。本篇會記錄讓檔案總管更符合我的使用習慣的方法。
<!-- more -->
如果你也覺得預設值不夠方便，不妨跟著我的步驟來調整，讓檔案總管更貼近一般使用者需求。
## 快速存取
首先先打開檔案總管，會看到快速存取的畫面，我會把起始畫面改為本機。

![initFolder](https://img.iach.cc/general/WindowsfileManager/Init.webp)

點選上方檢視，把顯示副檔名一併勾了，在最右邊找到選項

![option](https://img.iach.cc/general/WindowsfileManager/2.webp)

開啟選項視窗後把 ”開啟檔案總管以:” 的下拉選單改為以本機開啟。然後在隱私權的地方把兩個核取方塊都解除勾選~~，免得學習資料出現在快速存取，被別人看到多尷尬(誤。~~

![private](https://img.iach.cc/general/WindowsfileManager/3.webp)

重開檔案總管後就會顯示的位置就會在本機了，點選在本機左邊的>展開後會發現側邊欄有兩組桌面、下載、文件等資料夾，這個留一組就夠了，所以請在快速存取下面那些資料夾右鍵選擇”從![快速存取]取消釘選”，把能看到的都點掉，快速存取就空了。

![Quick access](https://img.iach.cc/general/WindowsfileManager/4.webp)
你可以選擇要不要使用這個功能，不想用就維持空的狀態，未來有需要頻繁開啟的資料夾可以右鍵>釘選到![快速存取]。把常用的東西釘上去讓我更快找到才是真正意義上的”快速存取”!!
![Pin Quick access](https://img.iach.cc/general/WindowsfileManager/5.webp)
## OneDrive
微軟的雲端備份，一般沒升級的普通帳號好像只有 5G 的使用空間，有些人喜歡有些人不喜歡，我學校的微軟帳號有 5TB 的空間，還是會拿來加減備份一下重要文件。如果沒有要用的話在下方工具列或win+R搜尋”regedit”打開登錄註冊程式，ctrl+F搜尋”018D5C66-4533-4307-9B53-224DE2ED1FE6”，找到 System.IsPinnedToNameSpaceTree 點擊後修改值把1改成0就能關了這功能。
![register about OneDrive](https://img.iach.cc/general/WindowsfileManager/final.webp)
![file nanager](https://img.iach.cc/general/WindowsfileManager/6.webp)