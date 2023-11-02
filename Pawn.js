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

  returnPossibleMoves() {
    // Basic logic or overridden by derived classes
    let possibleMoves = [];

    if ((this, color === "white" && this.firstMove)) {
      possibleMoves.push({
        row: this.position.row - 2,
        col: this.position.col,
      });
    }

    if (this.color === "white") {
      possibleMoves.push({
        row: this.position.row - 1,
        col: this.position.col,
      });
    }

    if ((this, color === "black" && this.firstMove)) {
      possibleMoves.push({
        row: this.position.row + 2,
        col: this.position.col,
      });
    }

    if (this.color === "white") {
      possibleMoves.push({
        row: this.position.row + 1,
        col: this.position.col,
      });
    }
  }

  isValidMove(targetPosition) {
    let possibleMoves = this.returnPossibleMoves();

    return possibleMoves.includes(targetPosition);
  }
}
