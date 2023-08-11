const moves = ["Rock", "Paper", "Scissors"];

const getComputerChoice = function () {
  const moveIndex = Math.floor(Math.random() * 3);
  return moves[moveIndex];
};

console.log(getComputerChoice());
