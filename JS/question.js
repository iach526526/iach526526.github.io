var end=false;
var point = 0;
var is_click = false;
var questions = [
{
    question: 'Which city does Each originate?',
    options: ['Taichung City', 'Taitung County', 'Taitung City', '	Taoyuan City'],
    answer: 0
},
{
    question: "Each 's Birthday(moonth/day)?",
    options: ['1011', '0526', '0516', '1010'],
    answer: 1
},
{
    question: 'Each favorite game series?',
    options: ['Super Mario', 'Pokémon', 'Kirby', 'The Legend of Zelda'],
    answer: 3
},
{
    question: 'Find the flag in this page(recommend PC)',
    options: ['flag{you_find_it!}', 'flag{crypto_is_fascinating}', 'flag{do_not_put_any_sensitive_information_in_JS}', 'flag{coding_is_my_passion}'],
    answer: 2
},
{
    question:'What is the color of the cat avatar on the homepage?',
    options: ['#172a54', 'red', 'yellow', '#d2d2d2'],
    answer: 0
},
{
    question: "I'm learning several programming languages and development tools, one of which I really like. Can you guess my favorite programming language?",
    options: ['Swift', "html(sorry, it's not a programming language!)", 'Java', 'C++'],
    answer: 3
},
{
    question: "下列何者較不可能在Each住的地方——臺灣發生 ？",
    options: ['300多人名字同時叫鮭魚', "4個人顧1隻魚顧到飛走", '看到小女孩在天上飛', '以上皆非'],
    answer: 3
},
{
    question: "對上一題很有信心？那再來一題吧!<br>下列何者較可能在Each住的地方——臺灣發生 ？",
    options: ['搭捷運被吊臂砸到', "溫度劑可以量雪的深度", '在國際機場裡游泳', '以上皆是'],
    answer: 3
},
{
    question: '快出對子對死他:<br>鶯鶯燕燕翠翠紅紅處處融融洽洽',
    options: ['風風雨雨花花葉葉年年朝朝暮暮', '晴晴雨雨涼涼暖暖各處悠悠融融馨馨', '雨雨風風花花葉葉年年暮暮朝朝', '歡歡喜喜慶慶賞賞愉愉悅悅開開應應'],
    answer: 2
},
{
    question: '根據色光三原色，點選:白色-青色的按鈕通關<br><a href="./imgs/three_color.jpg" target="_blank">點我看提示<a>',
    options: ['　', "　", '　', '　'],
    answer: 1
},
];

var turn = 0;
var interval;

function countDown(totalMilliseconds) {
interval = setInterval(function() {
    set_element(turn);
    totalMilliseconds -= 10;
    var seconds = Math.floor(totalMilliseconds / 1000);
    var formattedTime = seconds.toString().padStart(2, '0');
    document.getElementById("count_down_timer").innerHTML = formattedTime;

    if (totalMilliseconds <= 0) {
        
        toggleDisplayHint($('#timeup'))// 顯示時間到訊息
        clearInterval(interval);
        if (turn < questions.length - 1) {
            turn++;
            countDown(30000);
        } else {
            // 所有問題回答完畢，停止計時器
            end=true;
            clearInterval(interval);
            alert('你得了'+point+'/100分')
        }
        return;
        }
}, 10);
}

var ans;

function set_element(index) {
    var currentQuestion = questions[index];
    $('#title').html(currentQuestion.question);
    $('#btn1').html(currentQuestion.options[0]);
    $('#btn2').html(currentQuestion.options[1]);
    $('#btn3').html(currentQuestion.options[2]);
    $('#btn4').html(currentQuestion.options[3]);
    ans = currentQuestion.answer;
}


function toggleDisplayHint(element) {
    $(element).toggleClass('display-hint');
    setTimeout(function() {
        $(element).toggleClass('display-hint');
    }, 500);
}
$('.btn').click(function() {
    is_click = true;
    if(!end)
    {
        var selectedOption = $(this).index();
        console.log(questions[turn].question + ' | ' + (selectedOption + 1) + ' cl');
        if (ans === selectedOption) {//答對囉
            point += 10;
            console.log(point);
            toggleDisplayHint($('#correct'))// 顯示正確到訊息

        }
        else{//答錯
            toggleDisplayHint($('#false'))// 顯示錯誤到訊息
        }
        clearInterval(interval); // 清除計時器的間隔
        if (turn < questions.length - 1) {
            turn++;
            countDown(30000); // 重新啟動計時器
        }
        else
        {
            end=true;
            setTimeout(function() {
                alert('你得了'+point+'/100分')
            }, 500);
            
        }
            }

});

countDown(30000)