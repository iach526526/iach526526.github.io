---
title: 我用網頁還原了藥師少女的獨語OP中的星空場景
date: 2025-03-06 14:26:34
tags:
cover: /images/cover-Apothecary-Diaries-op-html.png
---

最近迷上了藥師少女這部動畫，OP 裡面有一幕是主角貓貓站在皇宮外牆上看星星，覺得這一幕蠻美的，於是我打算寫點 html 自己刻一個。

<iframe width="560" height="315" src="https://www.youtube.com/embed/29pmd1QiK-4?si=k6nYm6GiqK2j2nL1&amp;start=78" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

這這個架構的原件沒有很複雜，就是一顆超大的橢圓裡面有很多圓形的星星繞著它轉，然後地面上有貓貓，我不想特別做一個貓貓.svg 所以直接把影片的截圖拿來用就好。

![架構圖](/images/dev/explain.webp)
架構圖就像上圖所示這麼單純，上半部做好三顆橢圓、再來點漸層天空就做好了。橢圓形的效果可以幫 div (預設是矩形) 加上 `border-radius: 80%/100%;`讓它變扁。

星星的部分我用 JavaScript 動態自動一大堆，並使用我們小學二年級都學過的橢圓公式讓它繞圈圈。


如果你需要一邊看 code 和成果練習的話，這是 codepen 的版本，你可以自己註解部分的程式碼來查看差異，[點我觀看](https://codepen.io/iach526526/pen/wBvgwQx)。為了方便演示，codepen 上的版本是沒有把地平線去背的，貓貓就是一個長方形的方塊，

這是最終的成果展示，希望你喜歡我今天的分享。

[展示網站](https://www.iach.cc/web-demo/sky/)
