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
    let possibleMoves = [];

    const direction = this.color === "white" ? +1 : -1;
    const forwardMove = {
      row: this.position.row + direction,
      col: this.position.col,
    };

    // Add standard forward moves
    if (this.isInBounds(forwardMove.row, forwardMove.col)) {
      possibleMoves.push(forwardMove);

      if (this.firstMove) {
        const doubleMove = {
          row: this.position.row + 2 * direction,
          col: this.position.col,
        };
        if (this.isInBounds(doubleMove.row, doubleMove.col)) {
          possibleMoves.push(doubleMove);
        }
      }
    }

    // Add diagonal capture moves
    const captureMoves = [
      { row: this.position.row + direction, col: this.position.col - 1 },
      { row: this.position.row + direction, col: this.position.col + 1 },
    ];

    captureMoves.forEach((move) => {
      if (this.isInBounds(move.row, move.col)) {
        possibleMoves.push(move);
      }
    });

    console.log(possibleMoves);

    return possibleMoves;
  }
}
