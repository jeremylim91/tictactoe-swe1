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
