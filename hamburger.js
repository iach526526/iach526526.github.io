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