export default class chessPiece {
  position;
  color;
  whiteImage;
  blackImage;
  displayedImage;

  constructor(color, position) {
    this.color = color;
    this.position = position;
    this.setDisplayedImage();
  }

  setDisplayedImage() {
    if (this.color === "white") {
      this.displayedImage = this.whiteImage;
    } else if (this.color === "black") {
      this.displayedImage = this.blackImage;
    }
  }

  isValidMove(targetPosition) {
    // Basic logic or overridden by derived classes
  }

  move(newPosition) {
    // Basic logic or overridden by derived classes
  }

  canCapture(targetPosition) {
    // Basic logic or overridden by derived classes
  }

  capture(targetPiece) {
    // Notify GameLogic about the capture    
    // Add any other piece-specific logic if needed (e.g., special effects, sounds)
}

}
