// Please implement Tic Tac Toe logic here
// keep data about the game in a 2-D array

//= ==================GLOBAL VARIABLES====================
// store user's decision on the board size
let boardSize = '';
// keep data about the game in a 2-D array
let board = '';

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// current player global starts at X
let currentPlayer = 'X';

//= ==================HELPER FUNCTIONS====================

// ----------------make the board acc to user-specified size--------
const makeBoard = (boardSize) => {
  const board = [];
  for (let i = 0; i < boardSize; i += 1) {
    console.log('yay!');
    board.push([]);
    for (let j = 0; j < boardSize; j += 1) {
      board[i].push('');
    }
  }
  return board;
};

// -------------Output messages----------------
// build a function to add messages to the output box
const output = (message) => {
  document.getElementById('outputBox').innerText = message;
};

// -------display the winning message---------------
const displayWinMessage = (winningPlayer) => {
  const winCard = document.createElement('div');
  winCard.classList.add('winCard');
  winCard.innerText = `Congrats Player ${winningPlayer}, you win!`;
  document.body.appendChild(winCard);
  setTimeout(() => {
    document.body.removeChild(winCard);
    // reset the game
    document.body.innerHTML = '';
    gameInit();
  }, 3000);
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

// ----------SQUARE CLICK---------------------------
const squareClick = (column, row) => {
  console.log('coordinates', column, row);

  // see if the clicked square has been clicked on before
  if (board[column][row] === '') {
    // alter the data array, set it to the current player
    board[column][row] = currentPlayer;
    if (checkWin(board) === true) {
      console.log();
      output(`${currentPlayer}, you won!`);
      // show the winning message + reset
      displayWinMessage(currentPlayer);
    } else {
      // change the player
      togglePlayer();
    }
    // refresh the creen with a new board
    // according to the array that was just changed
    buildBoard(board);
  }
};
// ---------------CREATE THE INPUT CARD ELEMENT----------------
const createInputCardElement = () => {
  // create a card that will contain the instruction, input box, and submit button
  const inputCard = document.createElement('div');
  inputCard.setAttribute('id', 'inputCard');

  // create a text field that can hold instructions to users
  const instructionToUser = document.createElement('div');
  instructionToUser.setAttribute('id', 'instructionToUser');

  // create in input box that will let user provide written text
  const userInputBox = document.createElement('input');
  userInputBox.setAttribute('id', 'userInputBox');

  // creeate a submit button
  const userInputSubmitButton = document.createElement('button');
  userInputSubmitButton.innerText = 'Submit';
  userInputSubmitButton.setAttribute('id', 'userInputSubmitButton');

  inputCard.appendChild(instructionToUser);
  inputCard.appendChild(userInputBox);
  inputCard.appendChild(userInputSubmitButton);
  document.body.appendChild(inputCard);
};
// ----------VALIDATE USER'S INPUT ON THE BOARD SIZE-----
const validateBoardSizeInput = () => {
  boardSize = userInputBox.value;
  // if the user's input is valid (i.e. >=3), do 4 things:
  if (boardSize >= 3) {
    // 1. remove the userInputCardElement
    document.body.removeChild(document.getElementById('inputCard'));

    // 2. build an output box
    const outputBox = document.createElement('div');
    outputBox.classList.add('outputbox');
    outputBox.setAttribute('id', 'outputBox');
    document.body.appendChild(outputBox);

    // 3. build the board based on user's input
    board = makeBoard(boardSize);

    // 4. build the board element
    // build the boardContainer's element
    boardContainer = document.createElement('div');
    boardContainer.innerHTML = '';
    buildBoard(board);
    // append the board container
    document.body.appendChild(boardContainer);

    // If user's input is invalid, return message until user gives valid input
  } if (boardSize !== '' && boardSize < 3) {
    instructionToUser.innerText = 'Please enter a valid number that is >=3';
  }
};

//= ==================GAME INIT====================
// create the board container element and put it on the screen
const gameInit = () => {
  createInputCardElement();

  // welcome the user by displaying 'welcome' for 3 secs
  document.getElementById('instructionToUser').innerText = 'Welcome!';
  // after the welcome, instruct user to enter board size;
  setTimeout(() => {
    instructionToUser.innerText = 'This is a game of Tic Tac Toe. To begin, enter a board size (min size= 3)';
  }, (2000));

  // create an event listener that, when user clicks the submit button, whatever is in the input will be stored as a variable called 'board size'
  userInputSubmitButton.addEventListener('click', validateBoardSizeInput);
};

//= ==================START GAME====================
gameInit();
