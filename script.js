// This file contains the complete logic for a 5-round game of Rock Paper Scissors.

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

function getHumanChoice() {
    let input = prompt("provide your playing choice", "rock");
    let humanSelection = input.toLowerCase();
    return humanSelection;
}

// Determines if the human wins.
// It returns true for a human win, false for a human loss

function playRound() {
    let humanScore = 0;
    let computerScore = 0;

    let humanSelection = getHumanChoice();
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
            if (verdict === true) {
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

        console.log(`you draw, ${humanSelection} equals ${computerSelection}, play another round
        human score: ${humanScore}
        computer score: ${computerScore}`);
            //accounts for draw scenario
    } else if (computerSelection === "rock") {
        humanSelection === "scissors" ? (computerScore = 1, humanScore = 0) : (computerScore = 0, humanScore = 1);

        console.log(`${roundWinner_LooserLogging()}
        human score: ${humanScore}
        computer score: ${computerScore}`);

    } else if (computerSelection === "paper") {
        humanSelection === "scissors" ? (computerScore = 0, humanScore = 1) : (computerScore = 1, humanScore = 0);

        console.log(`${roundWinner_LooserLogging()}
        human score: ${humanScore}
        computer score: ${computerScore}`);

    } else { // computerSelection = scissors
        humanSelection === "rock" ? (computerScore = 0, humanScore = 1) : (computerScore = 1, humanScore = 0);

        console.log(`${roundWinner_LooserLogging()}
        human score: ${humanScore}
        computer score: ${computerScore}`);
    }

    let scores = [humanScore, computerScore];
    return scores;
}

function playGame() {
    let totalHumanScore = 0;
    let totalComputerScore = 0;

    
    for (let i = 0; i < 5; i++) {
        let score = playRound();
        totalComputerScore += score[1];
        totalHumanScore += score[0];
    }

    let outcome;
    if (totalComputerScore > totalHumanScore) {
        outcome = "you loose!"; //computer has more points
    } else if (totalComputerScore < totalHumanScore) {
        outcome = "you win!"; //human has more points
    } else {
        outcome = "you draw (play another round)";//equal points
    }

    let msg = "game complete";
    return `${msg}
            ${outcome}
           your score   :  ${totalHumanScore}
           computer     : ${totalComputerScore}`;
}


console.log(playGame());



