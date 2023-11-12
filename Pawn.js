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

  canCapture() {
    const captureMoves = [];

    const direction = this.color === "white" ? -1 : 1; // White moves up (-1), Black moves down (+1)

    // Capture moves are always one row ahead and one column to the left/right
    captureMoves.push({
      row: this.position.row + direction,
      col: this.position.col - 1,
    });
    captureMoves.push({
      row: this.position.row + direction,
      col: this.position.col + 1,
    });

    return captureMoves;
  }

  returnPossibleMoves() {
    // Basic logic or overridden by derived classes
    let possibleMoves = [];

    if (this.color === "white" && this.firstMove) {
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

    if (this.color === "black" && this.firstMove) {
      possibleMoves.push({
        row: this.position.row - 2,
        col: this.position.col,
      });
    }

    if (this.color === "black") {
      possibleMoves.push({
        row: this.position.row - 1,
        col: this.position.col,
      });
    }
    return possibleMoves;
  }
}
