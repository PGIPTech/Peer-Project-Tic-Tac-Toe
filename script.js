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


function handleClick(e) {
  const cell = e.target;
  isXTurn = true;
  placeMark(cell, X_CLASS);
  // Check for win or draw after player's move
  if (checkWin(X_CLASS)) {
    endGame(false);
    return; // No need for AI move if player wins
  } else if (isDraw()) {
    endGame(true);
    return; // No need for AI move if it's a draw
  }

  // AI move calculation using minimax
  isXTurn = false;
  minimax();

  // Check for win or draw after AI's move
  if (checkWin(CIRCLE_CLASS)) {
    endGame(false);
    return; // No need for further actions if AI wins
  } else if (isDraw()) {
    endGame(true);
    return; // No need for further actions if it's a draw
  }
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

  placeMark(cell, CIRCLE_CLASS);
} 

