import chessPiece from "./ChessPiece.js";

export default class Pawn extends chessPiece {
  firstMove = true;
  whiteImage = "./img/white_pawn.svg";
  blackImage = "./img/black_pawn.svg";
  constructor(color, position) {
    super(color, position); 
    this.setDisplayedImage(); 
  }
  promote() {}
  move(newPosition) {}
  capture(piece) {}
  isValidMove(newPosition) {}
}
