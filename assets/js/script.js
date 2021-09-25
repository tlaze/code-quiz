var timer; //Declares setInterval variable
var seconds = 80;   //Total amount of time/score for quiz
var subtractScore = 9;  //Reduces score by 9 + 1
var qNum = 0;   //Variable to cycle through questions

//Links to initial button and starts game when clicked
var quizButton = document.getElementById('startButton');
quizButton.addEventListener('click', startGame);

var viewToggler = document.getElementById('highScoreLink');

//Toggles between displaying each page
var toggleStartingPage = document.getElementById('startingPage');
toggleStartingPage.style.display = 'none';

var toggleGamePage = document.getElementById('gamePage');
toggleGamePage.style.display = 'none';

var toggleResultsPage = document.getElementById('resultsPage');
toggleResultsPage.style.display = 'none';

var toggleHighscorePage = document.getElementById('highscorePage');
toggleHighscorePage.style.display = 'none';

//Links to the timer displayed
var score = document.getElementById('timer');

//Stores quizQuestions in local storage
var displayedQuestion = document.getElementById('questionText');

//Links all button choices
var allButtons = document.getElementsByClassName('choices');

//Links each button indiviually
var uniqueButton = document.getElementsByTagName('choices');

//Links the correct answer in the array
var correctAnswers = document.getElementsByName('answer');

//Declaration displaying whether user answered right or wrong
var answerConfirmation = document.getElementById('answerConfirmation');

//Displays the final score on results page
var finalScore = document.getElementById('finalScore');

//Links submit button on results page
var highScores = document.getElementById('highscoreButton');

var viewScores = document.getElementById("highScoreLink"); 
viewScores.addEventListener("click", function(){
    if(toggleHighscorePage.style.display === "block"){
        playAgain();
    }
    else{
        toggleGamePage.style.display = "none";
        toggleResultsPage.style.display = "none";
        toggleStartingPage.style.display = "none";
        toggleHighscorePage.style.display = "block";
        viewScores.textContent = "Play Again?";
    }
})

//Array of quiz
var quizQuestions = 
[
    {
    'question': 'What do you wrap around Strings?',
    'choice': ['Brackets', 'Curly Brackets', 'Hypens', 'Quotes'],
    'answer': '4'
    },
    {
    'question': 'How do you increment by 1?',
    'choice': ['variable + variable', 'variable = + 1', 'variable+', 'Variable++'],
    'answer': '4' 
    },
    {
    'question': 'What is the "Skeleton" of the Website',
    'choice': ['Javascript', 'CSS', 'HTML', 'Humerus'],
    'answer': '3' 
    },
    {
    'question': 'What tag do you use to link a Javascript File',
    'choice': ['link', 'script', 'a', 'href'],
    'answer': '2' 
    },
    {
    'question': 'Will you give me a good grade for this?',
    'choice': ['ABSOLUTELY', 'no..', 'Please this was hard!', 'Choose A'],
    'answer': '1' 
    },
]

//Hides quiz questions until button is clicked
function startGame(){

    if(toggleStartingPage.style.display ==='none'){
        toggleStartingPage.style.display = 'block';
        toggleResultsPage.style.display = "none";
        toggleHighscorePage.style.display = "none";
    }
    else{
        toggleGamePage.style.display = 'block';
        toggleStartingPage.style.display = 'none';
        gamePlay();
    }
}


//Central hub where program is sent to other functions and returned 
function gamePlay(){
    startTimer();
    chooseAnswer();
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
            clearInterval(timer);
            toggleResultsPage.style.display = 'block';
            toggleGamePage.style.display = 'none';
            quizComplete();
        }   
    }, 1000);

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
            clearInterval(timer);
            quizComplete();
        }   
}

//Each button has unique identier in order to determine correct answer
function choiceMade(event){

    //Stores correct answer in localStorage
    localStorage.setItem('answers', JSON.stringify(quizQuestions[qNum].answer));
    correctAnswers = JSON.parse(localStorage.getItem('answers'));
    
    //Clicked button's id is stored
    var userAnswer = event.target.id;

    //Displays if button clicked matches the correct answer
    if(userAnswer === correctAnswers){
        answerConfirmation.textContent = "Correct";    //Displays 'Correct' when user answers correctly
    }

    //Subtracts score/time by 10 if user guesses incorrectly. Also displays 'Wrong'
    else{
        answerConfirmation.textContent = "Wrong!"; 
        seconds = seconds - subtractScore;
        localStorage.setItem('userScore', JSON.stringify(seconds));
        score.textContent = JSON.parse(localStorage.getItem('userScore'));
    }
    //iterates to the next question
    qNum++;
    chooseAnswer();  
}


//Displays results page and stores user's score
function quizComplete(){
    toggleResultsPage.style.display = 'block';
    toggleGamePage.style.display = 'none';
    finalScore.textContent = JSON.parse(localStorage.getItem('userScore'));
    
    highScores.addEventListener('click', saveScore)
    highScores.addEventListener('click', function(){

        toggleResultsPage.style.display = "none";
        toggleHighscorePage.style.display = "block";
        viewScores.textContent = "Play Again?";
        createHighScores();
    });
}

//Stores user score and initials into an object and sends it to function to store in local storage
function saveScore(){

    var displayedInitials = document.getElementById("userInitials").value;
    localStorage.setItem('userInitials', displayedInitials);
        
    var newScore = JSON.parse(localStorage.getItem('userScore'));

    var scoreObj = {
        initials: displayedInitials,
        score: newScore,
    }
    toLocalStorage(scoreObj); 
}

//Creates an array of scoreOjb and adds new results every time score is entered. If localStorage is empty, an empty bracket is added
function toLocalStorage(highscore){
    var resultsArray = JSON.parse(localStorage.getItem('results'));
    if(resultsArray == null){
        localStorage.setItem('results',JSON.stringify([]));
        toLocalStorage(highscore);
    }
    resultsArray.push(highscore);
    localStorage.setItem('results', JSON.stringify(resultsArray));

}
//adds and removes scores from list
function createHighScores(){
    
    var ranking =JSON.parse(localStorage.getItem('results'));

    //Adds new highscore
    for(var i = 0; i<ranking.length; i++){
        var scoreList = document.createElement("LI");
        var listText = document.createTextNode(ranking[i].initials + ": "  + ranking[i].score);
        scoreList.appendChild(listText);
        document.getElementById('rankings').appendChild(scoreList);
    }

    //Delete highscores from local Storage
    var deleteHighScores = document.querySelector('#eraseScores');
    deleteHighScores.addEventListener('click',function(){
        var element = document.getElementById('rankings');
        while(element.firstChild){
            element.removeChild(element.firstChild);
        }
        localStorage.clear();
    });    

}

function playAgain(){
    location.reload();
}

startGame();
