const playerChoice = document.querySelectorAll(".player");
const squares = document.querySelectorAll(".square");
const statusDisplay = document.querySelector(".game-status");
const restartButton = document.querySelector(".game-restart");
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winMessage = () => `Player ${currentPlayer} wins!`;
const drawMessage = () => `Draw!`;
const currentPlayerTurn = () => `Player ${currentPlayer}'s turn`;

statusDisplay.textContent = currentPlayerTurn();

const winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
};

const handlePlayerChange = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = currentPlayerTurn();
};

const handleResultValidation = () => {
  let roundWon = false;

  for (let i = 0; i <= 7; i++) {
    const winCondition = winningCombination[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    // if any of the cells are empty, then the round is not won
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  // if roundWon is true, then there is a winner
  if (roundWon) {
    statusDisplay.textContent = winMessage();
    statusDisplay.classList.add("winner");
    gameActive = false;
    return;
  }
  // if there is no winner, check for a draw
  let roundDraw = !gameState.includes(""); // if there is no empty cell
  if (roundDraw) {
    statusDisplay.textContent = drawMessage();
    statusDisplay.classList.add("draw");
    gameActive = false;
    return;
  }
  // if there is no winner or draw, change the player
  handlePlayerChange();
};

const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
};

const handleRestartGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.textContent = currentPlayerTurn();
  squares.forEach((square) => {
    square.textContent = "";
  });
};

const handlePlayerChoice = (event) => {
  const player = event.target;
  player.classList.contains("player-x")
    ? (currentPlayer = "X")
    : (currentPlayer = "O");

  statusDisplay.textContent = currentPlayerTurn();

  player.classList.add("active");
  playerChoice.forEach((player) => {
    if (player !== event.target) {
      player.classList.remove("active");
    }
  });
};

/*** Events handlers ***/

playerChoice.forEach((player) => {
  player.addEventListener("click", handlePlayerChoice);
});

squares.forEach((square) => {
  square.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", handleRestartGame);
