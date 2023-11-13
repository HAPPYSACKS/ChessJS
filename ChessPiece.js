export default class chessPiece {
  position;
  color;
  whiteImage;
  blackImage;
  displayedImage;

  constructor(color, position, gameLogic) {
    this.color = color;
    this.position = position;
    this.gameLogic = gameLogic;
    this.setDisplayedImage();
  }

  setDisplayedImage() {
    if (this.color === "white") {
      this.displayedImage = this.whiteImage;
    } else if (this.color === "black") {
      this.displayedImage = this.blackImage;
    }
  }

  returnPossibleMoves() {
    // Basic logic or overridden by derived classes
  }

  isValidMove(targetPosition) {
    // Basic logic or overridden by derived classes
  }

  canCapture(targetPosition) {
    // Basic logic or overridden by derived classes
  }

  capture(targetPiece) {
    // Notify GameLogic about the capture
    // Add any other piece-specific logic if needed (e.g., special effects, sounds)
  }

  isValidMove(targetPosition) {
    // Check if targetPosition is valid
    if (
      !targetPosition ||
      !this.isInBounds(targetPosition.row, targetPosition.col)
    ) {
      return false;
    }

    let possibleMoves = this.returnPossibleMoves();
    return possibleMoves.some(
      (move) =>
        move.row === targetPosition.row && move.col === targetPosition.col
    );

  }

  isInBounds(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  notifyListeners(event, data) {
    if (this.gameLogic) {
      this.gameLogic.notifyListeners(event, data);
    }
  }
}
