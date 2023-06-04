var i = 0;
var txt = '縱使改變，依然故我';//typing content只是簡單的打字效果
var speed = 100;//字符跳動速度
function delWriter(){
    document.getElementById("typing").innerHTML = document.getElementById("typing").innerHTML.slice(0,-1);
    i--;
    if(document.getElementById("typing").innerHTML=="")
    {
        i=0;
        setTimeout(typeWriter,1000);
        return;
    }
    setTimeout(delWriter,40);
}
function typeWriter() {
if (i < txt.length) {
    document.getElementById("typing").innerHTML += txt.charAt(i);
    i++;
    if(i==Math.round(txt.length/2))//輸出過半後停頓一下繼續
    {
        setTimeout(typeWriter, 600);
    }
    else if(i==txt.length)//全部打完就刪除文字
    {
        setTimeout(delWriter,1500);
    }
    else{
        setTimeout(typeWriter, speed);//正常輸出一個字元
    }
}
}
window.onload = function() {
    typeWriter()
};

