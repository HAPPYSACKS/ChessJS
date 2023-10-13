import chessPiece from "./ChessPiece.js";

export default class King extends chessPiece {
  canCastle = true;
  whiteImage = "./img/white_king.svg";
  blackImage = "./img/black_king.svg";
  constructor(color, position) {
    super(color, position); 
    this.setDisplayedImage(); 
  }
}
