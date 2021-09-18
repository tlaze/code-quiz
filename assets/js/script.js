console.log(document.querySelector(".startButton"));
var button = document.querySelector(".startButton");

button.addEventListener("click",buttonClicked);

function buttonClicked(){
    console.log("button clicked");
}