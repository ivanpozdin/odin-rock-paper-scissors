"use strict";
const playerImages = [...document.querySelectorAll(".player-container img")];
const computerImages = [
  ...document.querySelectorAll(".computer-container img"),
];
const playerScoreElement = document.querySelector(".score-player-container p");
const computerScoreElement = document.querySelector(
  ".score-computer-container p"
);
const gameInfo = document.querySelector(".game-info");

const NUMBER_OF_ROUNDS = 5;
const validChoices = ["rock", "paper", "scissors"];

let playerScore = 0;
let computerScore = 0;
let gamesNumber = 0;

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

const isTie = function (firstChoice, secondChoice) {
  return firstChoice.toLowerCase() === secondChoice.toLowerCase();
};

const capitalize = function (word) {
  if (word.length < 1) return word;
  return word.toLowerCase()[0].toUpperCase() + word.slice(1);
};

const createMessageForRound = function (playerChoice, computerChoice) {
  if (didFirstWinSecond(playerChoice, computerChoice)) {
    return `You won! ${capitalize(playerChoice)} beats ${capitalize(
      computerChoice
    )}`;
  } else if (isTie(playerChoice, computerChoice)) {
    return `It is a tie! ${capitalize(playerChoice)} doesn't beat ${capitalize(
      computerChoice
    )}`;
  } else {
    return `You lose! ${capitalize(playerChoice)} beats ${capitalize(
      computerChoice
    )}`;
  }
};

const isValidChoice = function (choice) {
  return validChoices.some((validChoice) => validChoice === choice);
};

const renderGameOverMessage = function (playerScore, computerScore) {
  if (playerScore === computerScore) {
    gameInfo.textContent = `Game over! It is a Draw!!!`;
  } else if (playerScore < computerScore) {
    gameInfo.textContent = `Game over! You Lose!!!`;
  } else {
    gameInfo.textContent = `Game over! You Won!!!`;
  }
};

const renderRoundInformation = function (
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

const updateScore = function (playerChoice, computerChoice) {
  if (didFirstWinSecond(playerChoice, computerChoice)) {
    playerScore++;
  }
  if (didFirstWinSecond(computerChoice, playerChoice)) {
    computerScore++;
  }
  gamesNumber++;
};

const renderScore = function () {
  playerScoreElement.innerHTML = playerScore;
  computerScoreElement.innerHTML = computerScore;
};

const renderComputerChoice = function (computerChoice) {
  const computerImgChoice = document.querySelector(
    `.computer-container [data-choice=${computerChoice}]`
  );
  computerImages.forEach((image) => image.classList.remove("chosen"));
  computerImgChoice.classList.add("chosen");
};

const reset = function () {
  [playerScore, computerScore, gamesNumber] = [0, 0, 0];
};

const isGameOver = () => gamesNumber === NUMBER_OF_ROUNDS;

const handlePlayerChoice = function (e) {
  gameInfo.textContent = "";
  renderScore();
  const playerChoice = e.target.dataset.choice;
  const computerChoice = getComputerChoice();
  renderComputerChoice(computerChoice);
  updateScore(playerChoice, computerChoice);
  renderScore();
  gameInfo.textContent = createMessageForRound(playerChoice, computerChoice);
  const gameOver = isGameOver();
  if (gameOver) {
    renderGameOverMessage(playerScore, computerScore);
    reset();
  }
};

const changeImageBorderOnHover = function (image) {
  image.addEventListener("mouseenter", () => image.classList.toggle("chosen"));
  image.addEventListener("mouseleave", () => image.classList.toggle("chosen"));
};

playerImages.forEach((image) => {
  changeImageBorderOnHover(image);
  image.addEventListener("click", handlePlayerChoice);
});
