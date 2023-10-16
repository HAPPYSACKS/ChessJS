import chessPiece from "./ChessPiece.js";

export default class Bishop extends chessPiece {
  whiteImage = "./img/white_bishop.svg";
  blackImage = "./img/black_bishop.svg";
  constructor(color, position) {
    super(color, position);
    this.setDisplayedImage();
  }
}
