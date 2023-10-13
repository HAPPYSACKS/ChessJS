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
    console.log(this.displayedImage);
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
    return true;
  }

  move(newPosition) {}

  capture(piece) {}
}
