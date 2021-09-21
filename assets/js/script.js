//Assigns button variable to the startButton class
var quizButton = document.querySelector(".startButton");

//When the start button is clicked, the startButtonClicked function will run
//quizButton.addEventListener("click",startButtonClicked);  Uncomment later****

//Links gamePage ID to JS variable
var showGamePage = document.getElementById('gamePage');

//Hides gamepage on initial start of application
// showGamePage.style.display = 'none'; Uncomment Later****


var hideContent = document.getElementById('startingPage'); //Delete Later***
hideContent.style.display = 'none'; //Delete LATER***

var qNum = 0;

var quizQuestions = 
[
    {
    'question': 'question 1 text',
    'choice': ['q1 choice 1', 'q1 choice 2', 'q1 choice 3', 'q1 choice 4'],
    'answer': '4'
    },
    {
    'question': 'question 2 text',
    'choice': ['q2 choice 1', 'q2 choice 2', 'q2 choice 3', 'q2 choice 4'],
    'answer': '3' 
    },
    {
    'question': 'question 3 text',
    'choice': ['q3 choice 1', 'q3 choice 2', 'q3 choice 3', 'q3 choice 4'],
    'answer': '2' 
    },
    {
    'question': 'question 4 text',
    'choice': ['q4 choice 1', 'q4 choice 2', 'q4 choice 3', 'q4 choice 4'],
    'answer': '1' 
    },
]

//Stores quizQuestions in local storage
var displayedQuestion = document.getElementById('questionText');

//Displays question in #questionText
displayedQuestion.textContent = JSON.parse(localStorage.getItem("storedQuestion"));


//Stores all possible choices per question into local storage
var allButtons = document.getElementsByClassName('choices');

//Stores the quiz choices in local storage and retrives it with uniqueButton
var uniqueButton = document.getElementsByTagName('choices');


//Stores correct answers in local storage and retrieves it as a string
var correctAnswers = document.getElementsByName('answer');
localStorage.setItem('answers', JSON.stringify(quizQuestions[qNum].answer));
correctAnswers = JSON.parse(localStorage.getItem('answers'));


//Central hub where program is sent to other functions and returned 
function gamePlay(){

    //Updates local storage to update choices each round
    localStorage.setItem('choices', JSON.stringify(quizQuestions[qNum].choice));
    uniqueButton = JSON.parse(localStorage.getItem('choices'));

    //Continues until user reaches last question
    if(qNum < quizQuestions.length){
        newQuestion();
        //Assigns each choice button a unique possible answer
        for(var i = 0; i < allButtons.length;i++){
            allButtons[i].textContent = uniqueButton[i];

        } 
        //Adds click eventListner to each button
        for(var i = 0; i < quizQuestions.length; i++){
            allButtons[i].addEventListener('click', choiceMade);

        }
        //iterates to the next question
        qNum++;
    }
    else{
        console.log("END!");
    }
    
}

//Changes the text for each question
function newQuestion(){
    // Stores the text for each question
    var questionNumber = JSON.stringify(quizQuestions[qNum].question);
    displayedQuestion.textContent = questionNumber;
}

//Each button has unique identier in order to determine correct answer
function choiceMade(event){
    var userChoice = event.target.id;
    console.log(userChoice);
    console.log(correctAnswers);

    if(userChoice === correctAnswers){
        console.log('correct!');
    }
    else{
        console.log("Wrong!");
    }
    gamePlay();
    
}


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
gamePlay();