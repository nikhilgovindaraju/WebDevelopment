let userScore=0;
let compScore=0;
const msg=document.querySelector("#msg");
const userScorePara=document.querySelector("#userScore");
const compScorePara=document.querySelector("#computerScore");
const choices=document.querySelectorAll(".choice");

const genCompChoice=()=>{
    const options=['rock','paper','scissor'];
    const randomIdx= Math.floor(Math.random()*3);
    return options[randomIdx];

}
const gameDraw=()=>{
    // console.log("game draw");
    msg.innerText="Its a Draw🤝"
    msg.style.backgroundColor="black";

};
const showWinner=(userWin)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        msg.innerText="You Win🏆";
        msg.style.backgroundColor="green";
    }
    else{
        compScore++;
        compScorePara.innerText=compScore;
        msg.innerText="You lose";
        msg.style.backgroundColor="red";
    }
};


const playGame=(userChoice)=>{
    // console.log("User choice is",userChoice);
    const compChoice= genCompChoice();
    // console.log("Comp choice is",compChoice);
    if(userChoice===compChoice){
        gameDraw();
    }
    else{
        let userWin=true;
        if(userChoice==='rock'){
            userWin=compChoice==='paper'?false:true;
        }
        else if(userChoice==='paper'){
            userWin=compChoice==='scissor'?false:true;
        }
        else{
            userWin=compChoice==='rock'?false:true;
        }
        showWinner(userWin);
    }


};

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        playGame(userChoice);
    });
});