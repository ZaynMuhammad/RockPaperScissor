let wins = function() {
    let playerWins = 0;
    let computerWins = 0;

    function getPlayerWins() {
        return playerWins;
    }

    function getComputerWins() {
        return computerWins;
    }

    function incrementPlayerWins() {
        playerWins++;
    }

    function incrementComputerWins() {
        computerWins++;
    }

    function resetPlayerWins() {
        playerWins = 0;
    }

    function resetComputerWins() {
        computerWins = 0;
    }

    function resetWins() {
        playerWins = 0;
        computerWins = 0;
    }

    function getComputerChoice() {
        return computerPlay();
    }

    return {
        getPlayerWins: getPlayerWins,
        getComputerWins: getComputerWins,
        incrementPlayer: incrementPlayerWins,
        incrementComputer: incrementComputerWins,
        resetPlayer: resetPlayerWins,
        resetComputer: resetComputerWins,
        resetWins: resetWins,
        computerPick: getComputerChoice
    }
}();

function computerPlay() {
    const choice = ["rock", "paper", "scissor"];
    let random = randomNumber(0, 2);

    return choice[random];
}

// Used to pick a random index in the "Rock", "Paper", "Scissor" array
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function playerPlay(choice) {
    // choice = choice.toLowerCase();
    let selection = "";

    if (choice === "rock")
        return selection = "rock";

    else if (choice === "scissor")
        return selection = "scissor";

    else if (choice === "paper")
        return selection = "paper";

    else
        return selection = "Invalid Choice Selected";
}

function playRound(playerSelection, computerSelection) {
    let playerPick = playerPlay(playerSelection);
    let computerPick = computerSelection;

    if (playerPick === "Invalid Choice Selected")
        return "Invalid Selection, try again";

    else if (playerPick === "rock" && computerPick === "rock")
        return roundResult = "Draw! you both picked rock!";

    else if (playerPick === "rock" && computerPick === "paper")
        return roundResult = "You lose! rock loses to paper!";

    else if (playerPick === "rock" && computerPick === "scissor")
        return roundResult = "You win! rock beats scissor!";

    else if (playerPick === "paper" && computerPick === "rock")
        return roundResult = "You win! paper beats rock!";

    else if (playerPick === "paper" && computerPick === "paper")
        return roundResult = "Draw! you both picked paper!";

    else if (playerPick === "paper" && computerPick === "scissor")
        return roundResult = "You lose! scissor beats paper!";

    else if (playerPick === "scissor" && computerPick === "rock")
        return roundResult = "You lose! rock beats scissor!";

    else if (playerPick === "scissor" && computerPick === "paper")
        return roundResult = "You win! scissor beats paper!";

    else if (playerPick === "scissor" && computerPick === "scissor")
        return roundResult = "Draw! you both picked scissor!";
}

function game(playerChoice, computerChoice) {
    let winner = playRound(playerChoice, computerChoice);

    if (winner.includes("win")) {
        wins.incrementPlayer();
        return winner;
    } else if (winner.includes("lose")) {
        wins.incrementComputer();
        return winner;
    } else if (winner.includes("Draw")) {
        return winner;
    }
}

function checkForWinner() {
    if (wins.getPlayerWins() === 3) {
        wins.resetWins();
        // return gameWinner = "You win the game!";
        return true
    }
    if (wins.getComputerWins() === 3) {
        wins.resetWins();
        // return gameWinner = "You lose the game! Computer is the winner!";
        return true
    }

    return false;
}

function buttonClick() {
    playerChoice = this.id;
    computerChoice = wins.computerPick();
    let winner = game(playerChoice, computerChoice);

    winCounter();

    fadeIn(winner);

    displayDecision(playerChoice, computerChoice);
}

function removeTransition() {
    this.classList.remove('btn-hovering');
}

function addTransition() {
    this.classList.add('btn-hovering');
}

function displayDecision(choice, computerPick) {
    const playerContainer = document.querySelector(".display-player");
    const computerContainer = document.querySelector(".display-computer");
    const imgPlayer = document.createElement("img");
    const imgComputer = document.createElement("img");
    let playerDecision = choice;
    let computerDecision = computerPick;

    imgPlayer.src = "/images/" + playerDecision + ".png";
    imgComputer.src = "/images/" + computerDecision + ".png";

    imgPlayer.style.width = '2.5rem';
    imgPlayer.style.height = '2.5rem';
    imgComputer.style.width = '2.5rem';
    imgComputer.style.height = '2.5rem';

    // Remove the display image if one is already in the display container,
    // otherwise the images will just chain together horizontally.
    if (playerContainer.hasChildNodes() && computerContainer.hasChildNodes()) {
        playerContainer.removeChild(playerContainer.childNodes[0]);
        computerContainer.removeChild(computerContainer.childNodes[0]);
    }

    playerContainer.style.cssText = "padding: 0.5rem 1rem";
    playerContainer.appendChild(imgPlayer);
    computerContainer.style.cssText = "padding: 0.5rem 1rem";
    computerContainer.appendChild(imgComputer);
}

// TODO(zayn): Replace the text displaying the winner with each subsequent display of who won the round. 
// Currently it keeps appending each subsequent text declaring the winner. Ideas: Figure out how to select the last h2 element 
// on the body element and keep overwriting it.
function fadeIn(winner) {
    let body = document.querySelector("body");
    let opacity = 0;
    let fade = document.createElement("h2");

    if (wins.getPlayerWins() > 2) {
        fade.textContent = "You win the game! Refresh the page to try again.";
        fade.style.paddingLeft = '460px';
        wins.resetComputer();
    } else if (wins.getComputerWins() > 2) {
        fade.textContent = "You lose the game! Computer is the winner! Refresh the page to try again.";
        fade.style.paddingLeft = '320px';
        wins.resetPlayer();
    } else {
        fade.textContent = winner;
        fade.style.paddingLeft = '580px';
    }

    let intervalID = setInterval(function() {

        if (opacity < 1) {
            opacity = opacity + 0.6
            fade.style.opacity = opacity;

            // Since we are appending our h2 element to the end of the body element, we check to see if the length of the
            // childNodes array is increased by 1 (length of 18), if it does have a length of 18, then our element is appended to
            // the body, and we remove it so the h2 elements won't stack.
            if (body.childNodes.length === 18) {
                body.removeChild(body.childNodes[17])
            }

            body.appendChild(fade);
        } else {
            clearInterval(intervalID);
        }
    }, 200);
}

// This will turn the score marker green for each point scored by the player or the computer
function winCounter() {
    let dot1 = document.querySelector("#dot-1");
    let dot2 = document.querySelector("#dot-2");
    let dot3 = document.querySelector("#dot-3");
    let dot4 = document.querySelector("#dot-4");
    let dot5 = document.querySelector("#dot-5");
    let dot6 = document.querySelector("#dot-6")

    // If dot3 or dot6 contains the win class, then the game is over. Stop keeping track of score
    if (dot3.classList.contains("win") || dot6.classList.contains("win"))
        return;

    if (wins.getPlayerWins() === 1)
        dot1.classList.add("win");

    if (wins.getPlayerWins() === 2)
        dot2.classList.add("win");

    if (wins.getPlayerWins() === 3)
        dot3.classList.add("win");

    if (wins.getComputerWins() === 1)
        dot4.classList.add("win");

    if (wins.getComputerWins() === 2)
        dot5.classList.add("win");

    if (wins.getComputerWins() === 3)
        dot6.classList.add("win");
}

function buttonEvent() {
    if (wins.getComputerWins() > 2 || wins.getPlayerWins() > 2) {
        buttons.forEach(button => button.removeEventListener('click', buttonClick));
    } else {
        buttons.forEach(button => button.addEventListener('click', buttonClick));
    }
}

function resetButton() {
    let body = document.querySelector("body");
    let resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset?"
    body.appendChild(resetButton);
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => button.addEventListener('mousedown', removeTransition));
buttons.forEach(button => button.addEventListener('mouseup', addTransition));
buttonEvent();