// Handles gamerules, player turns, and checks for specific states like check, checkmate, or stalemate.

// TODO
// Ensure pieces can't travel past each other (except knight)
// Adjust pawn first move accordingly

import ChessboardObserver from "./ChessboardObserver.js";
import Knight from "./Knight.js";

export default class Gamelogic extends ChessboardObserver {
  currentPlayer;
  chessboard;
  timer;
  whiteTimeRemaining;
  blackTimeRemaining;
  capturedWhitePieces = [];
  capturedBlackPieces = [];

  constructor(chessboard) {
    super("Chess Game");
    this.chessboard = chessboard;
    this.currentPlayer = "white";
    this.whiteTimeRemaining = 600; // 10 minutes in seconds
    this.blackTimeRemaining = 600; // 10 minutes in seconds
  }

  update(currentPosition, newPosition) {
    console.log(currentPosition);
    console.log(newPosition);
    this.movePiece(currentPosition, newPosition);
    this.chessboard.renderBoard();
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

  promotePawn() {
    //     After a pawn moves, check its rank.
    // If it's a white pawn on the 8th rank or a black pawn on the 1st rank, then it's eligible for promotion.
    // Prompt the player to choose a piece for promotion: queen, rook, bishop, or knight.
    // Replace the pawn on the board with the chosen piece.
  }

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

    const selectedChessPiece = this.chessboard.findPieceAt(
      currentPosition.row,
      currentPosition.col
    );

    if (selectedChessPiece.color !== this.currentPlayer) {
      console.error("It's not your turn!");
      return;
    }

    // Check if the move to 'new position' is valid
    if (selectedChessPiece && selectedChessPiece.isValidMove(newPosition)) {
      // Then check if there's a piece on the target square
      // if there's a piece at the target square and it's the opposing color, then capture it
      let targetPiece = this.chessboard.findPieceAt(
        newPosition.row,
        newPosition.col
      );

      // Check if the target square is occupied by an ally
      if (targetPiece && selectedChessPiece.color === targetPiece.color) {
        return; // Exit the function without making a move
      }

      if (
        !(selectedChessPiece instanceof Knight) &&
        this.hasInterveningPieces(currentPosition, newPosition)
      ) {
        console.error("Cannot move through other pieces!");
        return;
      }

      console.log(
        `checking if piece is capturable? ${
          targetPiece &&
          selectedChessPiece.color !== targetPiece.color &&
          selectedChessPiece.canCapture(newPosition)
        }`
      );
      if (
        targetPiece &&
        selectedChessPiece.color !== targetPiece.color &&
        selectedChessPiece.canCapture(newPosition)
      ) {
        this.pieceCaptured(selectedChessPiece, targetPiece);
      }
      // Update the position of the moving piece to the new position
      selectedChessPiece.position.row = newPosition.row;
      selectedChessPiece.position.col = newPosition.col;
      // Be careful of this, ensure it actually copies the currentPosition to newPosition and deletes the currentPosition after.
      this.chessboard.board[newPosition.row][newPosition.col] =
        selectedChessPiece;
      this.chessboard.board[currentPosition.row][currentPosition.col] = null;
    }

    // Stop Timer for player
    this.stopTimer();
    // Switch player after a move or capture
    this.switchPlayer();
    // Start Timer for swapped player
    this.startTimer();
  }

  pieceCaptured(capturingPiece, capturedPiece) {
    // Remove the captured piece from the board
    console.log(
      `Capruting Piece at ${capturedPiece.position.row}, ${capturedPiece.position.col}`
    );
    chessboard[capturedPiece.position.row][capturedPiece.position.col] = null;
    // Add the captured piece to a captured pieces area
    this.addCapturedPieceToDisplay(capturedPiece);
    // Handle any other game consequences of the capture

    // Check for:
    // pawn promotion
    // checkmate
    // stalemate
  }

  addCapturedPieceToDisplay(capturedPiece) {
    // Check if captured display is white or black, push
    // into the array of the respective colors

    if (capturedPiece.color === "white") {
      this.capturedWhitePieces.push(capturedPiece);
    } else {
      this.capturedBlackPieces.push(capturedPiece);
    }

    // Get regions of DOM that correspond to each capture area
    // id "captured-white" or "captured-black"
    let displayArea;
    if (capturedPiece.color === "white") {
      displayArea = document.getElementById("captured-white");
    } else {
      displayArea = document.getElementById("captured-black");
    }

    // Create an img element for captured element
    let pieceImg = document.createElement("img");
    // Set the src attribute to the capturedPiece.displayedImage
    pieceImg.src = capturedPiece.displayedImg;
    // Append created image to capture area.
    displayArea.appendChild(pieceImg);
  }
  hasInterveningPieces(start, end) {
    const direction = {
      x: start.col < end.col ? 1 : start.col > end.col ? -1 : 0,
      y: start.row < end.row ? 1 : start.row > end.row ? -1 : 0,
    };

    let currentPos = {
      row: start.row + direction.y,
      col: start.col + direction.x,
    };

    while (currentPos.row !== end.row || currentPos.col !== end.col) {
      if (this.chessboard.board[currentPos.row][currentPos.col] !== null) {
        return true; // There is a piece in the way
      }
      currentPos.row += direction.y;
      currentPos.col += direction.x;
    }

    return false;
  }
}
