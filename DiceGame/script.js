
function randInt(max){
    return Math.floor(Math.random()*max+1);
}
var num=(randInt(6));
var dice="dice"+num+".png";
var image="images/"+dice;
var image1= document.querySelectorAll("img")[0];
image1.setAttribute("src",image);

var num2=(randInt(6));
var dice2="dice"+num2+".png";
var newimage="images/"+dice2;
var image2= document.querySelectorAll("img")[1];
image2.setAttribute("src",newimage);

if(num>num2){
    document.querySelector("h1").innerHTML="Player 1 Wins 🚩";
    console.log("player 1 wins");
}
else if(num==num2){
    document.querySelector("h1").innerHTML="Its a Draw 🤝";
    console.log("draw");
}
else{
    document.querySelector("h1").innerHTML="Player 2 Wins 🚩";
    console.log("player 2 wins");
}

