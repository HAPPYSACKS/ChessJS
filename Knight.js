import chessPiece from "./ChessPiece.js";

export default class Knight extends chessPiece {
  whiteImage = "./img/white_knight.svg";
  blackImage = "./img/black_knight.svg";
  constructor(color, position) {
    super(color, position); 
    this.setDisplayedImage(); 
  }
}
