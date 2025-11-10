// This file contains the complete logic for a 5-round game of Rock Paper Scissors.

const rockNode=document.querySelector(".rock");
const paperNode=document.querySelector(".paper");
const scissorsNode=document.querySelector(".scissors");
const playPrompt=document.querySelector(".start-game");
const scoreBoard=document.querySelector(".score-board");
const roundComplete=document.querySelector("#round-complete");
const playRoundPrompt=document.querySelector("#next-round");
const gameCompletePrompt=document.querySelector(".end-game");
const humanScoreDisplay=document.querySelector("#player-score");
const computerScoreDisplay=document.querySelector("#computer-score");
const humanTotalDisplay=document.querySelector("#player-total");
const computerTotalDisplay=document.querySelector("#computer-total");
const winnerLooserNotification=document.querySelector(".alert");
const restartGame=document.querySelector("#new-game");
let totalHumanScore = 0;
let totalComputerScore = 0;
let playedGames=[];


//playing the game;	


restartGame.addEventListener("click",(e)=>{
        resetPlayedGames();
        resetBoxes();
});
const playerChoices=document.querySelectorAll(".game-component");
		playerChoices.forEach((playerChoice)=>{
			
			playerChoice.addEventListener("click",(e)=>{
                resetBoxes();
                let playerOption=playerChoice.dataset.choice;
                updatePlayedGames();

                if(playedGames.length==5){   
                    updateGameProgress(playedGames);               
                    playGame(playerOption);                 
                    renderVerdict();
                }else if(playedGames.length<5){
                    playGame(playerOption);
                    updateGameProgress(playedGames);

                }else{
                    resetPlayedGames();
                     playGame(playerOption);
                     updateGameProgress(playedGames);   
                }
 
			});
		});

function resetPlayedGames(){
        playedGames=[];
        winnerLooserNotification.textContent="Start New Game";
        humanScoreDisplay.textContent= 0;
        computerScoreDisplay.textContent= 0;
        computerTotalDisplay.textContent=`Total: `;
        humanTotalDisplay.textContent=`Total: `;
        totalComputerScore=0;
        totalHumanScore= 0;		 
}
function resetBoxes(){
    const allLevels=document.querySelectorAll(".box");
		allLevels.forEach((level)=>{

			level.classList.remove("active");
		});
	playPrompt.classList.add("active");
}
function updatePlayedGames(){
    playedGames.push(1);
}

function notifyUser(number){
            roundComplete.textContent=`Round ${number} Complete`;
            roundComplete.classList.add("active");
            setTimeout(()=>{
                if(number==5){
                    roundComplete.classList.add("done");
                    playRoundPrompt.classList.remove("active");
                    playRoundPrompt.textContent="";   
                    scoreBoard.classList.add("active");
                    scoreBoard.textContent=winnerLooserNotification.textContent;               
                    gameCompletePrompt.classList.add("active");
                    restartGame.classList.add("active"); 
                }else{
                    roundComplete.classList.add("done");
                    playRoundPrompt.textContent=`Play Round ${number+1}`;
                    playRoundPrompt.classList.add("active");
                    scoreBoard.classList.add("active");
                    scoreBoard.textContent=winnerLooserNotification.textContent;
                }
            },1000);
}
function updateGameProgress(array){
	switch(array.length){
			case 1:
                notifyUser(1);
			break;

			case 2:
                 notifyUser(2);            
			break;

			case 3:
                notifyUser(3);	
	                       
			break;

			case 4:
                notifyUser(4);                  
			break;
			case 5:
                notifyUser(5);	
            
            break;
			default:
                resetBoxes();
                resetPlayedGames();	
	}
}

// Gets the computer's choice.
function getComputerChoice() {
    let min = 1;
    let max = 3;

    let randomizer = Math.floor(Math.random() * (max - min + 1)) + min;
    let computerSelection = 0;
    computerSelection += randomizer;

    if (computerSelection === 1) {
        computerSelection = "rock";
    } else if (computerSelection === 2) {
        computerSelection = "paper";
    } else {
        computerSelection = "scissors";
    }

    return computerSelection;
}

function playRound(humanChoice) {
    let humanScore = 0;
    let computerScore = 0;

    let humanSelection = (humanChoice);
    let computerSelection = getComputerChoice();

        function humanWins() {
        
            switch (computerSelection) {
                case "rock":
                    if (humanSelection === "paper") {
                        return true; //win
                    }
                    break;

                case "paper":
                    if (humanSelection === "scissors") {
                        return true; //win
                    }
                    break;

                case "scissors":
                    if (humanSelection === "rock") {
                        return true; //win
                    }
                    break;
            }
        }

        //accounts for win and loss only not draw
        function roundWinner_LooserLogging() {

            let computerChoice=computerSelection;
            // Define win and loss messages
            const messages = {
                rockWins: "you win, rock beats scissors",
                paperWins: "you win, paper beats rock",
                scissorsWins: "you win, scissors beats paper",
                rockLooses: "you lose, paper beats rock",
                paperLooses: "you lose, scissors beats paper",
                scissorLooses: "you lose, rock beats scissors",
            };

            // Determine the winner
            const verdict = humanWins();

            let logMsg;
            if (verdict) {
                switch (computerChoice) {
                    case "rock":
                        logMsg = messages.paperWins;
                        break;
                    case "paper":
                        logMsg = messages.scissorsWins;
                        break;
                    case "scissors":
                        logMsg = messages.rockWins;
                        break;
                }
            } else{ 
                switch (computerChoice) {
                    case "rock":
                        logMsg = messages.scissorLooses;//rock beats scissors
                        break;
                    case "paper":
                        logMsg = messages.rockLooses;//paper beats rock
                        break;
                    case "scissors":
                        logMsg = messages.paperLooses;//scissors beats paper
                        break;
                }
            }
            return logMsg;
        }

    if (humanSelection === computerSelection) {
        humanScore = 1;
        computerScore = 1;
        winnerLooserNotification.textContent="draw, play another round";
            //accounts for draw scenario
    } else if (computerSelection === "rock") {
        humanSelection === "scissors" ? (computerScore = 1, humanScore = 0) : (computerScore = 0, humanScore = 1);
        winnerLooserNotification.textContent=roundWinner_LooserLogging();
    } else if (computerSelection === "paper") {
        humanSelection === "scissors" ? (computerScore = 0, humanScore = 1) : (computerScore = 1, humanScore = 0);
        winnerLooserNotification.textContent=roundWinner_LooserLogging();

    } else { // computerSelection = scissors
        humanSelection === "rock" ? (computerScore = 0, humanScore = 1) : (computerScore = 1, humanScore = 0);
        winnerLooserNotification.textContent=roundWinner_LooserLogging();
    }

    let scores = [humanScore, computerScore];
    return scores;
}

function playGame(humanChoice) {

        let score = playRound(humanChoice);//returns scores array[human,computer]

             totalComputerScore += score[1];
             totalHumanScore += score[0];

             computerTotalDisplay.textContent=`Total: ${totalComputerScore}`;
             humanTotalDisplay.textContent=`Total: ${totalHumanScore}`;
            humanScoreDisplay.textContent= `Round${playedGames.length}: ${score[0]}`;
            computerScoreDisplay.textContent= `Round${playedGames.length}: ${score[1]}`;
}
function renderVerdict(){
  let outcome;
    if (totalComputerScore > totalHumanScore) {
        outcome = "you loose!"; //computer has more points
    } else if (totalComputerScore < totalHumanScore) {
        outcome = "you win!"; //human has more points
    } else {
        outcome = "you draw (play another game)";//equal points
    }

    let msg = "game complete";

        winnerLooserNotification.textContent=msg+" ,"+outcome;
        humanScoreDisplay.textContent= humanScore;
        computerScoreDisplay.textContent= computerScore;
        computerTotalDisplay.textContent=totalComputerScore;
        humanTotalDisplay.textContent=totalHumanScore;
        return outcome;
}





