//Assigns button variable to the startButton class
var button = document.querySelector(".startButton");

//When the start button is clicked, the startButtonClicked function will run
//button.addEventListener("click",startButtonClicked);  Uncomment later****

//Links gamePage ID to JS variable
var showGamePage = document.getElementById('gamePage');

//Hides gamepage on initial start of application
// showGamePage.style.display = 'none'; Uncomment Later****


var hideContent = document.getElementById('startingPage'); //Delete Later***
hideContent.style.display = 'none'; //Delete LATER***



var quizQuestions = 
[
    {
    'question': 'question 1',
    'choice': ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    'answer': 4
    },
    {
    'question': 'question 2',
    'choice': ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    'answer': 3 
    },
    {
    'question': 'question 3',
    'choice': ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    'answer': 2 
    },
    {
    'question': 'question 4',
    'choice': ['choice 1', 'choice 2', 'choice 3', 'choice 4'],
    'answer': 1 
    },
]

console.log(quizQuestions[0].question);//displays the string of question 1 in the array
console.log(quizQuestions[1].choice[0]);




//Hides the starting page once the start quiz button is clicked


//Commented out so I woudn't have to continue to hit start button to access quizGameplay()
// function startButtonClicked(){
//     var hideContent = document.getElementById('startingPage');

//     if(hideContent.style.display ==='none'){
//         hideContent.style.display = 'block';
//     }
//     else{
//         showGamePage.style.display = 'block';
//         hideContent.style.display = 'none';
//         quizGameplay();
//     }
// }

//Cycles throught each question
function quizGameplay(){
    //Displays the first question when the game starts
    var displayedQuestion = document.getElementById('questionText');
    displayedQuestion.textContent = quizQuestions[0].question;

    //Displays the first choice inside the button
    var displayedChoices = document.getElementsByClassName('choices');
    displayedChoices[0].textContent = quizQuestions[1].choice[0];

}



quizGameplay();