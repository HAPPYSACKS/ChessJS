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
  listeners = [];

  registerListener(listener) {
    this.listeners.push(listener);
  }

  notifyListeners(event, data) {
    for (let listener of this.listeners) {
      if (typeof listener[event] === "function") {
        listener[event](data);
      }
    }
  }

  isCheck() {
    // Identify the position of the king for the current player.
    // For every piece of the opposing player, check if they can move to the king's position.
    // If any opposing piece can legally move to the king's position, the king is in "check".
  }

  isCheckMate() {
    // Start by determining if the king is in "check" using the method above.
    // If the king is in check, then:
    // Determine all the legal moves for the king.
    // For each legal move:
    // Simulate that move.
    // Check if the king is still in "check" in that simulated position.
    // If the king is in check in every simulated position, move on to step 3.
    // For every piece of the current player:
    // Simulate all their legal moves.
    // After each simulated move, check if the king is still in "check".
    // If no piece can make a move that removes the "check" on the king, it's "checkmate".
  }

  isStaleMate() {
    // Ensure the current player's king is not in check. If the king is in check, it's not a stalemate.
    // Loop through all the pieces of the current player.
    // For each piece, generate all potential moves.
    // For each potential move, simulate it and check if the move results in a self-check. If not, then the move is valid.
    // If you find at least one valid move, it's not a stalemate.
    // If you go through all the pieces and all potential moves and don't find any valid move, then it's a stalemate.
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
  }

  onPieceCaptured(data) {
    // run pieceCaptured method
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
