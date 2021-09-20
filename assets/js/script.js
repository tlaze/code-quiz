//Assigns button variable to the startButton class
var button = document.querySelector(".startButton");

//When the start button is clicked, the startButtonClicked function will run
button.addEventListener("click",startButtonClicked);

var showGamePage = document.getElementById('gamePage');
showGamePage.style.display = 'none';





//Hides the starting page once the start quiz button is clicked
function startButtonClicked(){
    console.log('button clicked');
    var hideContent = document.getElementById('startingPage');

    if(hideContent.style.display ==='none'){
        hideContent.style.display = 'block';
    }
    else{
        showGamePage.style.display = 'block';
        hideContent.style.display = 'none';
    }
}

