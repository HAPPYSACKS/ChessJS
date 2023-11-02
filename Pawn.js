import chessPiece from "./ChessPiece.js";

export default class Pawn extends chessPiece {
  firstMove = true;
  whiteImage = "./img/white_pawn.svg";
  blackImage = "./img/black_pawn.svg";
  constructor(color, position) {
    super(color, position);
    this.setDisplayedImage();
  }
  canPromote() {
    // maybe implement, depending on if needed, or using listeners to implement this.
  }

  isValidMove(targetPosition) {
    let possibleMoves = [];

    if ((this, color === "white" && this.firstMove)) {
      possibleMoves.push({
        row: targetPosition.row - 2,
        col: targetPosition.col,
      });
    }

    if (this.color === "white") {
      possibleMoves.push({
        row: targetPosition.row - 1,
        col: targetPosition.col,
      });
    }

    if ((this, color === "black" && this.firstMove)) {
      possibleMoves.push({
        row: targetPosition.row + 2,
        col: targetPosition.col,
      });
    }

    if (this.color === "white") {
      possibleMoves.push({
        row: targetPosition.row + 1,
        col: targetPosition.col,
      });
    }
  }
}
