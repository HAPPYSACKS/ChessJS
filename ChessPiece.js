export default class chessPiece {
  position;
  color;
  whiteImage;
  blackImage;

  constructor(color, position) {
    this.color = color;
    this.position = position;
  }

  isValidMove(targetPosition) {
    // Basic logic or overridden by derived classes
    return true;
  }

  move(newPosition) {}

  capture(piece) {}
}
