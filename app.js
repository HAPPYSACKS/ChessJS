import Chessboard from "./Chessboard.js";

// let columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
// let boardHTML = "";

// for (let row = 0; row <= 8; row++) {
//   for (let col of columns) {
//     boardHTML += `<div class="square" id=${col}${row}></div>`;
//   }
// }

// document.getElementById("chessboard").innerHTML = boardHTML;

let chessboard = new Chessboard();
chessboard.initializeBoard();
chessboard.renderBoard();
