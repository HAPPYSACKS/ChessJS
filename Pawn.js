import chessPiece from "./ChessPiece.js";

export default class Pawn extends chessPiece {
  firstMove = true;
  promote() {}
  move(newPosition) {}
  capture(piece) {}
  isValidMove(newPosition) {}
}
