"use strict";

const NUMBER_OF_ROUNDS = 5;
const validChoices = ["Rock", "Paper", "Scissors"];

const winningMovesCombinations = {
  paper: "rock",
  rock: "scissors",
  scissors: "paper",
};

const getComputerChoice = function () {
  const choiceIndex = Math.floor(Math.random() * 3);
  return validChoices[choiceIndex];
};

const getPlayerChoice = function () {
  let playerChoice = "";
  while (!isValidChoice(playerChoice)) {
    playerChoice = prompt(
      "Enter your move(rock, paper or scissors): "
    ).toLowerCase();
  }
  return playerChoice;
};

const didFirstWinSecond = function (firstChoice, secondChoice) {
  return (
    winningMovesCombinations[firstChoice.toLowerCase()] ===
    secondChoice.toLowerCase()
  );
};

const isDraw = function (firstChoice, secondChoice) {
  return firstChoice.toLowerCase() === secondChoice.toLowerCase();
};

const capitalize = function (word) {
  if (word.length < 1) return word;
  return word.toLowerCase()[0].toUpperCase() + word.slice(1);
};

const createMessageForDraw = function (firstChoice, secondChoice) {
  return `It is a draw! ${capitalize(firstChoice)} doesn't beat ${capitalize(
    secondChoice
  )}`;
};
const createMessageForPlayerVictory = function (
  playerSelection,
  computerSelection
) {
  const message = `You Won! `;
  return (
    message +
    `${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`
  );
};
const createMessageForComputerVictory = function (
  playerSelection,
  computerSelection
) {
  const message = `You Lose! `;
  return (
    message +
    `${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`
  );
};

const playRound = function (playerSelection, computerSelection) {
  if (isDraw(playerSelection, computerSelection)) {
    return createMessageForDraw(playerSelection, computerSelection);
  }
  const didPlayerWon = didFirstWinSecond(playerSelection, computerSelection);

  if (didPlayerWon) {
    return createMessageForPlayerVictory(playerSelection, computerSelection);
  } else {
    return createMessageForComputerVictory(playerSelection, computerSelection);
  }
};

const isValidChoice = function (choice) {
  return validChoices.some((validChoice) => validChoice === capitalize(choice));
};

const alertGameOver = function (playerScore, computerScore) {
  if (playerScore === computerScore) {
    alert(
      `Game over! \nScore: \nyou: ${playerScore}\ncomputer: ${computerScore}\nIt is a Draw!!!`
    );
  } else if (playerScore < computerScore) {
    alert(
      `Game over! \nScore: \nyou: ${playerScore}\ncomputer: ${computerScore}\nYou Lose!!!`
    );
  } else {
    alert(
      `Game over! \nScore: \nyou: ${playerScore}\ncomputer: ${computerScore}\nYou Won!!!`
    );
  }
};

const alertRound = function (
  playerChoice,
  playerScore,
  computerChoice,
  computerScore
) {
  alert(
    `Your choice: ${capitalize(playerChoice)}\nComputer choice: ${capitalize(
      computerChoice
    )}\n${playRound(
      playerChoice,
      computerChoice
    )}\nYou ${playerScore} : Computer ${computerScore}`
  );
};

const game = function () {
  let playerScore = 0;
  let computerScore = 0;
  for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    const playerWon = didFirstWinSecond(playerChoice, computerChoice);
    const computerWon = didFirstWinSecond(computerChoice, playerChoice);
    if (playerWon) {
      playerScore++;
    }
    if (computerWon) {
      computerScore++;
    }
    alertRound(playerChoice, playerScore, computerChoice, computerScore);
  }
  alertGameOver(playerScore, computerScore);
};

const images = [...document.querySelectorAll(".player-container img")];
images.forEach((image) => {
  image.addEventListener("mouseenter", function (e) {
    image.classList.add("chosen");
  });
  image.addEventListener("mouseleave", function (e) {
    image.classList.remove("chosen");
  });
});

// game();
