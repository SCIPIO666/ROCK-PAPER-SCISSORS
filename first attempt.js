function getComputerChoice(min,max){
    let randomizer = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomizer;
}
//console.log(getComputerChoice(1,3));

function getHumanChoice(){
    let input = prompt("provide your playing choice","");
    return input;
}
let humanScore = 0;
let computerScore = 0;
let humanSelection = getHumanChoice().toLowerCase();
let computerSelection = getComputerChoice(1,3);

function playRound(humanSelection, computerSelection){
    if(computerSelection === 1){
        computerSelection = "rock";
    } else if(computerSelection === 2){
        computerSelection = "paper";
    } else{
        computerSelection = "scissors";
    }

    switch(humanSelection){
        case "rock":
            if(computerSelection === "scissors"){
                humanScore = 1;
                computerScore = 0;
                console.log("you win, rock beats scissors")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            } else if(computerSelection === "paper"){
                humanScore = 0;
                computerScore = 1;
                console.log("you loose, Paper beats Rock")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            } else {
                humanScore = 1;
                computerScore = 1;
                console.log("you draw, rock equals rock, play another round")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            }
            break;
        case "scissors":
            if(computerSelection === "rock"){
                humanScore = 0;
                computerScore = 1;
                console.log("you loose, rock beats scissors")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            } else if(computerSelection === "paper"){
                humanScore = 1;
                computerScore = 0;
                console.log("you win, scissors beats paper")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            } else {
                humanScore = 1;
                computerScore = 1;
                console.log("you draw, scissors equals scissors, play another round")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            }
            break;
        case "paper":
            if(computerSelection === "scissors"){
                humanScore = 0;
                computerScore = 1;
                console.log("you loose, scissors beats paper")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            } else if(computerSelection === "rock"){
                humanScore = 1;
                computerScore = 0;
                console.log("you win, Paper beats Rock")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            } else {
                humanScore = 1;
                computerScore = 1;
                console.log("you draw, paper equals paper, play another round")
                console.log(`human score: ${humanScore}`);
                console.log(`computer score: ${computerScore}`);
            }
            break;
        default:
            humanScore = 0;
            computerScore = 0;
            console.log(`human score: ${humanScore}`);
            console.log(`computer score: ${computerScore}`);
            console.log("spell check");
            alert("check the spellings of your entry!");
            break;
    }

    let scores = [humanScore, computerScore];
    return scores;
}

function playGame(){
    let totalHumanScore = 0;
    let totalComputerScore = 0;

    for (let i = 0; i < 5; i++){
        let humanSelection = getHumanChoice().toLowerCase();
        let computerSelection = getComputerChoice(1,3);
        let scores = playRound(humanSelection, computerSelection);
        totalComputerScore += scores[1];
        totalHumanScore += scores[0];
    }

    let outcome;
    if(totalComputerScore > totalHumanScore){
        outcome = "you loose!"
    } else if(totalComputerScore < totalHumanScore){
        outcome = "you win!"
    } else {
        outcome = "you draw (play another round)";
    }
    
    let msg = "game complete";
    return msg + ", " + outcome;
}

console.log(playGame());