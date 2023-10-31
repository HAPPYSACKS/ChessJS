import Bishop from "./Bishop.js";
import Knight from "./Knight.js";
import King from "./King.js";
import Pawn from "./Pawn.js";
import Queen from "./Queen.js";
import Rook from "./Rook.js";

export default class Chessboard {
  board;
  currentPlayer;
  selectedTile = null;
  selectedPiece = null;
  constructor() {
    this.board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
  }

  findPieceAt(row, col) {}

  handleSquareClick(row, col) {
    console.log(`${row}, ${col}`);
  }

  initializeBoard() {
    // Initialize pawns
    for (let i = 0; i < 8; i++) {
      this.board[1][i] = new Pawn("white", { row: 1, col: i });
      this.board[6][i] = new Pawn("black", { row: 6, col: i });
    }

    // Initialize other white pieces
    this.board[0][0] = new Rook("white", { row: 0, col: 0 });
    this.board[0][7] = new Rook("white", { row: 0, col: 7 });
    this.board[0][1] = new Knight("white", { row: 0, col: 1 });
    this.board[0][6] = new Knight("white", { row: 0, col: 6 });
    this.board[0][2] = new Bishop("white", { row: 0, col: 2 });
    this.board[0][5] = new Bishop("white", { row: 0, col: 5 });
    this.board[0][3] = new Queen("white", { row: 0, col: 3 });
    this.board[0][4] = new King("white", { row: 0, col: 4 });

    // Initialize other black pieces
    this.board[7][0] = new Rook("black", { row: 7, col: 0 });
    this.board[7][7] = new Rook("black", { row: 7, col: 7 });
    this.board[7][1] = new Knight("black", { row: 7, col: 1 });
    this.board[7][6] = new Knight("black", { row: 7, col: 6 });
    this.board[7][2] = new Bishop("black", { row: 7, col: 2 });
    this.board[7][5] = new Bishop("black", { row: 7, col: 5 });
    this.board[7][3] = new Queen("black", { row: 7, col: 3 });
    this.board[7][4] = new King("black", { row: 7, col: 4 });
  }

  removePiece(position) {
    // set position to null
  }

  renderBoard() {
    let boardHTML = document.getElementById("chessboard");
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let square = document.createElement("div");
        square.className = "square";
        square.id = `${String.fromCharCode(97 + col)}${8 - row}`; // a8, b8, ..., h1

        square.addEventListener("click", () => {
          this.handleSquareClick(row, col);
        });

        let piece = this.board[row][col];
        if (piece) {
          let pieceImg = document.createElement("img");
          pieceImg.src = piece.displayedImage;
          square.appendChild(pieceImg);
        }
        boardHTML.appendChild(square);
      }
    }
  }
}
