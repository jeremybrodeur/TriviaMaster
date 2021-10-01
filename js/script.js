
ouvrirMenu();
var btn = document.querySelector('#loadQuestion');
var btnValidator = document.querySelector('#validator');
var btnNext = document.querySelector('#nextQuestion');
var divPointer = document.querySelector('#questionBox');
var questionChoice1 = document.querySelector('label[for="1"]');
var questionChoice2 = document.querySelector('label[for="2"]');
var questionChoice3 = document.querySelector('label[for="3"]');
var questionChoice4 = document.querySelector('label[for="4"]');
var radioButton1 = document.getElementById('1');
var radioButton2 = document.getElementById('2');
var radioButton3 = document.getElementById('3');
var radioButton4 = document.getElementById('4');
var score = 0;
var scoreCounter = document.getElementById('scoreCounter').innerHTML;
btn.onclick = function(){

    btnValidator.style.display = 'block';
    btnNext.style.display = 'none';
    var request = new XMLHttpRequest();
    let category ="";
    let categorySelect = document.querySelector('#categorySelecter').value;
    if(categorySelect != 'any'){
        category ="&category=" + categorySelect;
    }
    request.open('GET','https://opentdb.com/api.php?amount=1&type=multiple'+ category);
    

        request.onload = function(){
            if (request.status>= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                renderHTML(data);
                document.querySelector('.card').style.display = 'block';
            }
            else{
               alert("Connection lost.");
            }
        };
        request.send();
};

btnNext.onclick = function(){

    var request = new XMLHttpRequest();
    let category ="";
    let categorySelect = document.querySelector('#categorySelecter').value;
    if(categorySelect != 'any'){
        category ="&category=" + categorySelect;
    }
    request.open('GET','https://opentdb.com/api.php?amount=1&type=multiple'+ category);
    

        request.onload = function(){
            if (request.status>= 200 && request.status < 400) {
                var ourData = JSON.parse(request.responseText);
                renderHTML(ourData);
                document.querySelector('.card').style.display = 'block';
            }
            else{
               alert("Connection lost.");
            }
        };
        request.send();
        btnValidator.style.display = 'block';
        btnNext.style.display = 'none';
};
function renderHTML(data){
    resetCheck();
    resetStyle();
    var question = "";
    var choice1 = "";
    var choice2 = "";
    var choice3 = "";
    var choice4 = "";
    var indexGenerator = Math.floor(Math.random() * 3);
    var tabAnswers = data.results[0].incorrect_answers;
    tabAnswers.splice(indexGenerator,0,data.results[0].correct_answer);
    question = data.results[0].question;
    document.querySelector('#answerConverter').innerHTML = data.results[0].correct_answer;
    for (let i = 0; i < tabAnswers.length; i++) {
        choice1 = tabAnswers[0];
        choice2 = tabAnswers[1];
        choice3 = tabAnswers[2];
        choice4 = tabAnswers[3];
    }
    divPointer.innerHTML = question;
    questionChoice1.innerHTML = choice1;
    questionChoice2.innerHTML = choice2;
    questionChoice3.innerHTML = choice3;
    questionChoice4.innerHTML = choice4;
    var tabReponse = [questionChoice1,questionChoice2,questionChoice3,questionChoice4];
    btnValidator.onclick = function(){
        if(radioButton1.checked ||radioButton2.checked ||radioButton3.checked ||radioButton4.checked){
        validateAnswer();
        var answer = document.querySelector('#answerConverter').innerHTML;
        for (let i = 0; i < tabReponse.length; i++) {
            if(tabReponse[i].innerHTML==answer){
                tabReponse[i].style.color='green';
                tabReponse[i].style.fontWeight='800';
            }   
        } 
    }
        else alert('Veuillez choisir une réponse.');
        checkIfWin(score);
    };  
}

function validateAnswer() {
    
    var answer = document.querySelector('#answerConverter').innerHTML;
    if(document.getElementById('1').checked){
        if(questionChoice1.innerHTML == answer){
            questionChoice1.style.color = 'green';
            questionChoice1.style.fontWeight = '800';
            score++;
            $('#scoreCounter').html('Current score : '+ score); 
        }
        else{
            questionChoice1.style.color = 'red';
            questionChoice1.style.fontWeight = '800';
        }
    }
    if(document.getElementById('2').checked){
        if(questionChoice2.innerHTML == answer){
            questionChoice2.style.color = 'green';
            questionChoice2.style.fontWeight = '800';
            score++;
            $('#scoreCounter').html('Current score : '+ score);
            
        }
        else{
            questionChoice2.style.color = 'red';
            questionChoice2.style.fontWeight = '800';
        }
    }
    if(document.getElementById('3').checked){
        if(questionChoice3.innerHTML == answer){
            questionChoice3.style.color = 'green';
            questionChoice3.style.fontWeight = '800';
            score++;
            $('#scoreCounter').html('Current score : '+ score);
            
        }
        else{
            questionChoice3.style.color = 'red';
            questionChoice3.style.fontWeight = '800';
        }
    }
    if(document.getElementById('4').checked){
        if(questionChoice4.innerHTML == answer){
            questionChoice4.style.color = 'green';
            questionChoice4.style.fontWeight = '800';
            score++;
            $('#scoreCounter').html('Current score : '+ score);
            
        }
        else{
            questionChoice4.style.color = 'red';
            questionChoice4.style.fontWeight = '800';
        }
        
    }
    btnValidator.style.display = 'none';
    btnNext.style.display = 'block';  
}
function resetStyle(){
    questionChoice1.style.color='#000000';
    questionChoice1.style.fontWeight ='400';
    questionChoice2.style.color='#000000';
    questionChoice2.style.fontWeight ='400';
    questionChoice3.style.color='#000000';
    questionChoice3.style.fontWeight ='400';
    questionChoice4.style.color='#000000';
    questionChoice4.style.fontWeight ='400';
}

function resetCheck() {
    document.querySelectorAll('input[type="radio"]').forEach(function (elm,i) {
        elm.checked = false;
    });
}
function checkIfWin(score){
    if(score == 15){
        
        $("#myNav2").animate({
            opacity: '1',
            zIndex: '1'
            
        },100);
        $("body").css({
            zIndex: '0'
            
        });
        $("#myNav2").css({
            display: 'block'
            
        });
        ouvrirMenu2();
    }
}
function ouvrirMenu() {
    document.getElementById("myNav").style.width = "100%";
  }
  function ouvrirMenu2() {
    document.getElementById("myNav2").style.width = "100%";
  }
$('#startGame').click(function() {
    $("#myNav").fadeOut();
    $("body").css({
        zIndex: '1'
        
    });
    $("#myNav").css({
        display: 'none'
        
    });
    $("#myNav2").css({
        display: 'none'
        
    });

});






