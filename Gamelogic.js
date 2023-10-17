// Handles gamerules, player turns, and checks for specific states like check, checkmate, or stalemate.
export default class Gamelogic {
  currentPlayer;
  chessboard;
  timer;

  constructor(chessboard) {
    this.chessboard = chessboard;
    this.currentPlayer = "white";
  }

  isValidMove(currentPosition, newPosition) {}

  isCheck() {}

  isCheckMate() {}

  isStaleMate() {}

  switchPlayer() {}

  promotePawn() {}

  startTimer() {}

  stopTImer() {}
}
