import chessPiece from "./ChessPiece.js";

export default class Bishop extends chessPiece {
  whiteImage = "./img/black_bishop.svg";
  blackImage = "./img/white_bishop.svg";
  constructor(color, position) {
    super(color, position);
    this.setDisplayedImage();
  }
}
