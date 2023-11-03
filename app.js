import Chessboard from "./Chessboard.js";
import Gamelogic from "./Gamelogic.js";

let chessboard = new Chessboard();
let gameLogic = new Gamelogic(chessboard);
chessboard.initializeBoard();

chessboard.renderBoard();
