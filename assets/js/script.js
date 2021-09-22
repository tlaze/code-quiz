//Links to initial button and starts game when clicked
var quizButton = document.querySelector(".startButton");
quizButton.addEventListener("click",startGame);

//Toggles between displaying each page
var toggleGamePage = document.getElementById('gamePage');
toggleGamePage.style.display = 'none';

var toggleStartingPage = document.getElementById('startingPage');
toggleStartingPage.style.display = 'none';

var toggleResultsPage = document.getElementById('resultsPage');
toggleResultsPage.style.display = 'none';


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

//Declaration displaying whether user answered right or wrong
var answerConfirmation;

//Puts final score at id
var finalScore = document.getElementById('finalScore');

//Time at start of quiz
var timer;
var seconds = 80;
var subtractScore = 9;

//Links to timer
var score = document.getElementById('timer');

//Puts time in local storage and stores value in storedScore
localStorage.setItem('userScore', JSON.stringify(seconds));
var storedScore = JSON.parse(localStorage.getItem('userScore'));

//Question Number
var qNum = 0;

//Array of quiz
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
    'answer': '4' 
    },
    {
    'question': 'question 3 text',
    'choice': ['q3 choice 1', 'q3 choice 2', 'q3 choice 3', 'q3 choice 4'],
    'answer': '3' 
    },
    {
    'question': 'question 4 text',
    'choice': ['q4 choice 1', 'q4 choice 2', 'q4 choice 3', 'q4 choice 4'],
    'answer': '2' 
    },
    {
    'question': 'question 5 text',
    'choice': ['q5 choice 1', 'q5 choice 2', 'q5 choice 3', 'q5 choice 4'],
    'answer': '1' 
    },
]

//Central hub where program is sent to other functions and returned 
function gamePlay(){
    startTimer();
    chooseAnswer();
}

//Changes the text for each question
function newQuestion(){
    // Stores the text for each question
    displayedQuestion.textContent = JSON.stringify(quizQuestions[qNum].question);
}

//Displays all choices for each question
function chooseAnswer(){

    //Continues until user reaches last question
    if(qNum < quizQuestions.length && seconds >= 0){

        //Updates local storage to update choices each round
            localStorage.setItem('choices', JSON.stringify(quizQuestions[qNum].choice));
            uniqueButton = JSON.parse(localStorage.getItem('choices'));
            newQuestion();
    
            //Assigns each choice button a unique possible answer
            for(var i = 0; i < allButtons.length;i++){
                allButtons[i].textContent = uniqueButton[i];
            } 
            //Adds click eventListner to each button
            for(var y = 0; y < allButtons.length; y++){
                allButtons[y].addEventListener('click', choiceMade);
            }
        }
        else{
            toggleGamePage.style.display = 'none';
            toggleResultsPage.style.display = 'block';
            clearInterval(timer);
            enterHighscore();
        }   
}

//Each button has unique identier in order to determine correct answer
function choiceMade(event){

    //Stores correct answer in localStorage
    localStorage.setItem('answers', JSON.stringify(quizQuestions[qNum].answer));
    correctAnswers = JSON.parse(localStorage.getItem('answers'));
    
    //Clicked button's id is stored
    var userChoice = event.target.id;
    
    //Displays if button clicked matches the correct answer
    if(userChoice === correctAnswers){

        answerConfirmation = document.getElementById('answerConfirmation');
        answerConfirmation.textContent = "Correct";    //Displays 'Correct' when user answers correctly
   
    }
    //Subtracts score/time by 10 if user guesses incorrectly. Also displays 'Wrong'
    else{
        answerConfirmation = document.getElementById('answerConfirmation')
        answerConfirmation.textContent = "Wrong!"; 
        seconds = seconds - subtractScore;
        score.textContent = JSON.parse(localStorage.getItem('userScore'));
    }
    //iterates to the next question
    qNum++;
    chooseAnswer();  
}

//Displays results page and stores scores
function enterHighscore(){
    answerConfirmation.display = 'block'; //Get to show on results page\
    finalScore.textContent = JSON.parse(localStorage.getItem('userScore'));
}

//Sets timer and displays score
function startTimer(){

    //Sets and decrements the timer. Displays it on screen
    timer = setInterval(function(){
        localStorage.setItem('userScore', JSON.stringify(seconds));
        seconds--;
        score.textContent = JSON.parse(localStorage.getItem('userScore'));
        
        //Ends when timer runs out or user answers all questions
        if(seconds < 0 || qNum === quizQuestions.length){
            console.log('time up');
            clearInterval(timer);
            enterHighscore();
        }   
    }, 1000);

}

//Hides quiz questions until button is clicked
function startGame(){

    if(toggleStartingPage.style.display ==='none'){
        toggleStartingPage.style.display = 'block';
    }
    else{
        toggleGamePage.style.display = 'block';
        toggleStartingPage.style.display = 'none';
        gamePlay();
    }
}


startGame();