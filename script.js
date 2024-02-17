const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

let turn = 'X';
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

// Function to handle cell click (modified)
const handleClick = (event) => {
  const cellIndex = event.target.dataset.cell;
  if (board[cellIndex] !== ' ') {
    return; // Cell already occupied
  }

  board[cellIndex] = turn;
  event.target.textContent = turn;

  // Check for win or draw
  if (checkWin(board, turn)) {
    message.textContent = `${turn} wins!`;
    // Disable further clicks
  } else if (checkDraw(board)) {
    message.textContent = "It's a draw!";
    // Disable further clicks
  } else {
    // AI move
    const aiMove = aiTurn(board);
    board[aiMove] = 'O';
    cells[aiMove].textContent = 'O';

    // Check for win or draw again
    if (checkWin(board, 'O')) {
      message.textContent = "AI wins!";
      // Disable further clicks
    } else if (checkDraw(board)) {
      message.textContent = "It's a draw!";
      // Disable further clicks
    } else {
      // Switch turns
      turn = turn === 'X' ? 'O' : 'X';
      message.textContent = `${turn}'s turn`;
    }
  }
};

// Function to check for win (no changes)

// Function to check for draw (no changes)

// AI turn function
const aiTurn = (board) => {
  // Implement your AI logic here
  // Here's a simplified example prioritizing winning moves and blocking opponent's winning moves:

  // Find all empty cells
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === ' ') {
      emptyCells.push(i);
    }
  }

  // Check for AI winning moves
  for (let i = 0; i < emptyCells.length; i++) {
    const tempBoard = [...board]; // Copy the board
    tempBoard[emptyCells[i]] = 'O'; // Simulate AI move
    if (checkWin(tempBoard, 'O')) {
      return emptyCells[i]; // Return winning move
    }
  }

  // Check for blocking opponent's winning moves
  for (let i = 0; i < emptyCells.length; i++) {
    const tempBoard = [...board]; // Copy the board
    tempBoard[emptyCells[i]] = 'X'; // Simulate opponent's move
    if (checkWin(tempBoard, 'X')) {
      return emptyCells[i]; // Block opponent's winning move
    }
  }

  // Choose a random empty cell if no specific move found
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

// Add click event listeners to cells (no changes)

// Initial message (no changes)