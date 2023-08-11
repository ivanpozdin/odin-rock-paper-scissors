"use strict";
const moves = ["Rock", "Paper", "Scissors"];

const winningMovesCombinations = {
  paper: "rock",
  rock: "scissors",
  scissors: "paper",
};

const getComputerChoice = function () {
  const moveIndex = Math.floor(Math.random() * 3);
  return moves[moveIndex];
};

const didFirstMoveWinSecond = function (firstMove, secondMove) {
  return (
    winningMovesCombinations[firstMove.toLowerCase()] ===
    secondMove.toLowerCase()
  );
};

const isDraw = function (firstMove, secondMove) {
  return firstMove.toLowerCase() === secondMove.toLowerCase();
};

const getCapitalizedWord = function (word) {
  return word.toLowerCase()[0].toUpperCase() + word.slice(1);
};

const createMessageForDraw = function (firstMove, secondMove) {
  return `It is a draw! ${getCapitalizedWord(
    firstMove
  )} doesn't beat ${getCapitalizedWord(secondMove)}`;
};
const createMessageForPlayerVictory = function (
  playerSelection,
  computerSelection
) {
  const message = `You won! `;
  return (
    message +
    `${getCapitalizedWord(playerSelection)} beats ${getCapitalizedWord(
      computerSelection
    )}`
  );
};
const createMessageForComputerVictory = function (
  playerSelection,
  computerSelection
) {
  const message = `You Lose! `;
  return (
    message +
    `${getCapitalizedWord(computerSelection)} beats ${getCapitalizedWord(
      playerSelection
    )}`
  );
};

const playRound = function (playerSelection, computerSelection) {
  if (isDraw(playerSelection, computerSelection)) {
    return createMessageForDraw(playerSelection, computerSelection);
  }
  const didPlayerWon = didFirstMoveWinSecond(
    playerSelection,
    computerSelection
  );

  if (didPlayerWon) {
    return createMessageForPlayerVictory(playerSelection, computerSelection);
  } else {
    return createMessageForComputerVictory(playerSelection, computerSelection);
  }
};

const playerSelection = "rock";
const computerSelection = getComputerChoice();
console.log(playRound(playerSelection, computerSelection));
