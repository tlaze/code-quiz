//Assigns button variable to the startButton class
var button = document.querySelector(".startButton");

//When the start button is clicked, the startButtonClicked function will run
button.addEventListener("click",startButtonClicked);

//Links gamePage ID to JS variable
var showGamePage = document.getElementById('gamePage');

//Hides gamepage on initial start of application
showGamePage.style.display = 'none';

var quizQuestions = 
[
    {
    question: 'question 1',
    choices: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    answer: 4
    },
    {
    question: 'question 2',
    choices: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    answer: 3 
    },
    {
    question: 'question 3',
    choices: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    answer: 2 
    },
    {
    question: 'question 4',
    choices: ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    answer: 1 
    },
]


//Hides the starting page once the start quiz button is clicked
function startButtonClicked(){
    var hideContent = document.getElementById('startingPage');

    if(hideContent.style.display ==='none'){
        hideContent.style.display = 'block';
    }
    else{
        showGamePage.style.display = 'block';
        hideContent.style.display = 'none';
        quizGameplay();
    }
}

function quizGameplay(){
    for(var i = 0; i < quizQuestions.length; i++){
        var question = quizQuestions[i];
        console.log(question);
    }
}
