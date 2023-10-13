import chessPiece from "./ChessPiece.js";

export default class Rook extends chessPiece {
  canCastle = true;
  whiteImage = "./img/white_rook.svg";
  blackImage = "./img/black_rook.svg";
  constructor(color, position) {
    super(color, position);
    this.setDisplayedImage();
  }
}
