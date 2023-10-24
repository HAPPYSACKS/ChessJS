// Handles gamerules, player turns, and checks for specific states like check, checkmate, or stalemate.
export default class Gamelogic {
  currentPlayer;
  chessboard;
  timer;
  whiteTimeRemaining;
  blackTimeRemaining;
  capturedWhitePieces = [];
  capturedBlackPieces = [];

  constructor(chessboard) {
    this.chessboard = chessboard;
    this.currentPlayer = "white";
    this.whiteTimeRemaining = 600; // 10 minutes in seconds
    this.blackTimeRemaining = 600; // 10 minutes in seconds
  }

  isCheck() {}

  isCheckMate() {}

  isStaleMate() {}

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
  }

  promotePawn() {}

  startTimer() {
    // Ensure any existing timer is cleared first
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      let timerElement;
      if (this.currentPlayer === "white") {
        this.whiteTimeRemaining--;
        timerElement = document.getElementById("white-timer");

        if (this.whiteTimeRemaining <= 0) {
          clearInterval(this.timer);
          // Handle game over due to time running out
        }
      } else {
        this.blackTimeRemaining--;
        timerElement = document.getElementById("black-timer");

        if (this.blackTimeRemaining <= 0) {
          clearInterval(this.timer);
          // Handle game over due to time running out
        }
      }

      const minutes = Math.floor(
        this.currentPlayer === "white"
          ? this.whiteTimeRemaining / 60
          : this.blackTimeRemaining / 60
      );
      const seconds =
        (this.currentPlayer === "white"
          ? this.whiteTimeRemaining
          : this.blackTimeRemaining) % 60;

      timerElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  movePiece(currentPosition, newPosition) {
    // get chess piece at 'current position'
    // Check if the move to 'new position' is valid
    // Then check if there's a piece on the target square
    // if there's a piece at the target square and it's the opposing color, then capture it
    // Update the position of the moving piece to the new position
    // Stop Timer for player
    // Switch player after a move or capture
    // Start Timer for swapped player
  }

  pieceCaptured(capturingPiece, capturedPiece) {
    // Remove the captured piece from the board
    // Add the captured piece to a captured pieces area
    // Handle any other game consequences of the capture
    // Check for:
    // pawn promotion
    // checkmate
    // stalemate
  }

  addCapturedPieceToDisplay(capturedPiece) {
    // Check if captured display is white or black, push
    // into the array of the respective colors
    // Get regions of DOM that correspond to each capture area
    // id "captured-white" or "captured-black"
    // Create an img element for captured element
    // Set the src attribute to the capturedPiece.displayedImage
    // Append created image to capture area.
  }
}
