// Please implement Tic Tac Toe logic here
// keep data about the game in a 2-D array

//= ==================GLOBAL VARIABLES====================
// keep data about the game in a 2-D array
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

// variables for checkWin
const firstSquare = null;
const secondSquare = null;
const thirdSquare = null;

//= ==================HELPER FUNCTIONS====================
// ------empty board--------------
const emptyBoard = () => {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
};

// -------------Output messages----------------
// build a function to add messages to the output box
const output = (message) => {
  outputBox.innerText = message;
};

// -------display the winning message---------------
const displayWinMessage = (winningPlayer) => {
  const winCard = document.createElement('div');
  winCard.classList.add('winCard');
  winCard.innerText = `Congrats Player ${winningPlayer}, you win!`;
  document.body.appendChild(winCard);
  setTimeout(() => {
    document.body.removeChild(winCard);
  }, 5000);
};

// ----------------Build the board-------------------------
// completely rebuilds the entire board every time there's a click
const buildBoard = (board) => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
            square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
  output(`Hello! Player ${currentPlayer}, it's your turn`);
};
// ----------checkWIn----------------------------
const checkWin = (board) => {
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length - 2; j += 1) {
      if ((board[i][j] !== '') && board[i][j] === board[i][j + 1] && board[i][j + 1] === board[i][j + 2]) {
        return true;
      }
    }
  }
  for (let i = 0; i < board.length - 2; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if ((board[i][j] !== '') && board[i][j] === board[i + 1][j] && board[i + 1][j] === board[i + 2][j]) {
        return true;
      }
    }
  }

  // check for diagonal left-to-right win
  for (let i = 0; i < board.length - 2; i += 1) {
    for (let j = 0; j < board[i].length - 2; j += 1) {
      if ((board[i][j] !== '') && board[i][j] === board[i + 1][j + 1] && board[i + 1][j + 1] === board[i + 2][j + 2]) {
        return true;
      }
    }
  }
  // check for diagonal right-to-left win
  for (let i = 0; i < board.length - 2; i += 1) {
    for (let j = 0; j < board[i].length - 2; j += 1) {
      if ((board[i][board[j].length - 1] !== '') && (board[i][board[j].length - 1] === board[i + 1][board[j].length - 2]) && (board[i + 1][board[j].length - 2] === board[i + 2][board[j].length - 3])) {
        return true;
      }
    }
  }

  return false;
};
// --------------TOGGLE PLAYERS----------------------
// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  output(`Player ${currentPlayer}, it's your turn`);
};

// ----------square click---------------------------
const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    if (checkWin(board) === true) {
      console.log();
      output(`${currentPlayer}, you won!`);
      displayWinMessage(currentPlayer);
      emptyBoard();
      buildBoard(board);
    } else {
      // change the player
      togglePlayer();
    }
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
  }
};

//= ==================GAME INIT====================
// create the board container element and put it on the screen
const gameInit = () => {
  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};
// build an output box
const outputBox = document.createElement('div');
outputBox.classList.add('outputbox');
document.body.appendChild(outputBox);

//= ==================START GAME====================
gameInit();

// // check for horizontal win2
// for (let i = 0; i < board.length; i += 1) {
//   for (let j = 0; j < board[i].length; j += 1) {
//     if (firstSquare === null && secondSquare === null && thirdSquare === null) {
//       firstSquare = currentPlayer;
//       return;
//     }
//     if (firstSquare !== null && secondSquare === null && thirdSquare === null) {
//       secondSquare = currentPlayer;
//       return;
//     } if (firstSquare !== null && secondSquare !== null) {
//       thirdSquare = currentPlayer;
//       return;
//     }
//     if ((firstSquare === secondSquare && secondSquare === thirdSquare) && (thirdSquare !== null)) {
//       return true;
//     }
//     firstSquare = null;
//     secondSquare = null;
//     thirdSquare = null;
//   }
// }
