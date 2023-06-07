$('.hamburger-menu').click(function(){//判斷選單有無被點擊，若有，開啟全屏選單，並把選單下層的元素加上毛玻璃特效
    $('.fullscreen-menu').toggleClass('display_nav');
    $('div:not(.fullscreen-menu,.hamburger-menu,.line)').toggleClass('blur');
    $('.hamburger-menu').toggleClass('move');

});
$('.fullscreen-menu:not(ul)').click(function(){//若全屏選單已經開啟且被點擊任一處，則關閉選單(把選單加上display:none的效果)
    $('.fullscreen-menu').toggleClass('display_nav');
    $('div:not(.fullscreen-menu,.hamburger-menu,.line)').toggleClass('blur');
    $('.hamburger-menu').toggleClass('move');//漢堡選單交叉的CSS
});
$('#about').click(function()
{
    alert("你好，我是Aleart Wizard\n這是Each在111學年的期末作業。為了他的肝著想，我會出現在他不想獨立做一頁的互動")
})