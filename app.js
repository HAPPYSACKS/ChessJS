// <!-- Course: SENG 513 -->
// <!-- Date: NOV 13, 2023 -->
// <!-- Assignment 3 -->
// <!-- Name: Eric Mao -->
// <!-- UCID: 30120909 -->
import Chessboard from "./Chessboard.js";
import Gamelogic from "./Gamelogic.js";

let chessboard = new Chessboard();
let gameLogic = new Gamelogic(chessboard);
chessboard.initializeBoard();
chessboard.subscribe(gameLogic);
chessboard.renderBoard();
