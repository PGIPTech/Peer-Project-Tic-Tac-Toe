const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let isXTurn = true;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isXTurn = true;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {once: true});
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function placeTurn(cell) {
  swapTurns()
  const currentClass = isXTurn ? X_CLASS : CIRCLE_CLASS;

  placeMark(cell, currentClass);
  // Check for win or draw after player's move
  if (checkWin(currentClass)) {
    endGame(false);
    return; // No need for AI move if player wins
  } else if (isDraw()) {
    endGame(true);
    return; // No need for AI move if it's a draw
  }
}


function handleClick(e) {
  const playerCell = e.target;
  placeTurn(playerCell)

  // AI move calculation using minimax
  const aiCell = minimax();
  placeTurn(aiCell);
}


function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${isXTurn ? "X's" : "O's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  });
}

function placeMark(cell, currentClass) {
  // Validate cell element before modifying its class list
  if (cell && cell.classList) {
    cell.classList.add(currentClass);
  } 
}

function swapTurns() {
  isXTurn = !isXTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (isXTurn) {
    board.classList.add(X_CLASS);
  } else {
    board.classList.add(CIRCLE_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}


// Minimax algorithm implementation with depth limit
function minimax() {
  let i = Math.floor(Math.random()*8)+1;
  cell = document.querySelector(`.cell:nth-child(${i})`);

  if (cell.className === "cell circle" || cell.className === "cell x") {
    return minimax();
  }

  return cell;
} 

