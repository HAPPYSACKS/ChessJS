import chessPiece from "./ChessPiece.js";

export default class Queen extends chessPiece {
  whiteImage = "./img/white_queen.svg";
  blackImage = "./img/black_queen.svg";
  constructor(color, position) {
    super(color, position); 
    this.setDisplayedImage(); 
  }
}
