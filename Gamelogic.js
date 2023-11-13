// Handles gamerules, player turns, and checks for specific states like check, checkmate, or stalemate.

// TODO
// Ensure pieces can't travel past each other (except knight)
// Adjust pawn first move accordingly

import ChessboardObserver from "./ChessboardObserver.js";
import Knight from "./Knight.js";
import Pawn from "./Pawn.js";
import King from "./King.js";

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

  isPlayerTurn(chessPiece) {
    return chessPiece && chessPiece.color === this.currentPlayer;
  }

  isValidMove(selectedChessPiece, targetPiece, currentPosition, newPosition) {
    if (!selectedChessPiece.isValidMove(newPosition)) {
      return false;
    }

    // Special handling for pawn captures
    if (selectedChessPiece instanceof Pawn) {
      return this.isValidPawnMove(
        selectedChessPiece,
        targetPiece,
        currentPosition,
        newPosition
      );
    }

    if (this.isAllyPiece(targetPiece, selectedChessPiece)) {
      console.error("Cannot capture your own piece!");
      return false;
    }

    if (
      !(selectedChessPiece instanceof Knight) &&
      this.hasInterveningPieces(currentPosition, newPosition)
    ) {
      console.error("Cannot move through other pieces!");
      return false;
    }

    return true;
  }

  isValidPawnMove(pawn, targetPiece, currentPosition, newPosition) {
    // Determine if the move is a forward move or a capture
    const isForwardMove = newPosition.col === currentPosition.col;
    const isCaptureMove = !isForwardMove && targetPiece;

    if (isForwardMove && targetPiece) {
      console.error("Pawns cannot move forward into occupied squares!");
      return false;
    }

    if (isCaptureMove && (!targetPiece || targetPiece.color === pawn.color)) {
      console.error("Invalid pawn capture!");
      return false;
    }

    return true;
  }

  isAllyPiece(targetPiece, selectedChessPiece) {
    return targetPiece && selectedChessPiece.color === targetPiece.color;
  }

  isInvalidKnightMove(selectedChessPiece, currentPosition, newPosition) {
    return (
      !(selectedChessPiece instanceof Knight) &&
      this.hasInterveningPieces(currentPosition, newPosition)
    );
  }

  executeMove(selectedChessPiece, targetPiece, newPosition) {
    if (this.canCapturePiece(selectedChessPiece, targetPiece, newPosition)) {
      console.log(selectedChessPiece);
      this.pieceCaptured(selectedChessPiece, targetPiece);
    }

    this.updatePiecePosition(selectedChessPiece, newPosition);
  }

  canCapturePiece(selectedChessPiece, targetPiece, newPosition) {
    return (
      targetPiece &&
      selectedChessPiece.color !== targetPiece.color &&
      selectedChessPiece.canCapture(newPosition)
    );
  }

  updatePiecePosition(chessPiece, newPosition) {
    this.chessboard.board[chessPiece.position.row][chessPiece.position.col] =
      null;
    chessPiece.position = { ...newPosition };
    this.chessboard.board[newPosition.row][newPosition.col] = chessPiece;
  }

  finalizeMove() {
    this.stopTimer();
    this.switchPlayer();
    this.startTimer();
    this.chessboard.renderBoard();
  }
  isCheck() {
    const kingPosition = this.findKing(this.currentPlayer);
    const opponentColor = this.currentPlayer === "white" ? "black" : "white";

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.chessboard.findPieceAt(row, col);
        if (piece && piece.color === opponentColor) {
          // Check if piece can legally move to the king's position
          if (this.canMoveToPosition(piece, kingPosition, { row, col })) {
            return true;
          }
        }
      }
    }
    return false;
  }

  canMoveToPosition(piece, targetPosition, currentPosition) {
    if (piece instanceof Knight) {
      // Knights can jump over pieces
      return piece.isValidMove(targetPosition);
    } else {
      // Check for intervening pieces for other piece types
      return (
        piece.isValidMove(targetPosition) &&
        !this.hasInterveningPieces(currentPosition, targetPosition)
      );
    }
  }

  findKing(playerColor) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.chessboard.findPieceAt(row, col);
        if (piece instanceof King && piece.color === playerColor) {
          return { row, col };
        }
      }
    }
    return null;
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
  pieceCaptured(capturingPiece, capturedPiece) {
    // Remove the captured piece from the board
    console.log(
      `Capturing Piece at ${capturedPiece.position.row}, ${capturedPiece.position.col}`
    );
    this.chessboard.board[capturedPiece.position.row][
      capturedPiece.position.col
    ] = null;
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

  movePiece(currentPosition, newPosition) {
    const selectedChessPiece = this.chessboard.findPieceAt(
      currentPosition.row,
      currentPosition.col
    );

    if (!this.isPlayerTurn(selectedChessPiece)) {
      console.error("It's not your turn!");
      return;
    }

    const targetPiece = this.chessboard.findPieceAt(
      newPosition.row,
      newPosition.col
    );

    if (
      !this.isValidMove(
        selectedChessPiece,
        targetPiece,
        currentPosition,
        newPosition
      )
    ) {
      return;
    }

    // Simulate the move and check if it results in check
    const originalPosition = { ...selectedChessPiece.position };
    this.updatePiecePosition(selectedChessPiece, newPosition);

    if (this.isCheck()) {
      console.error(
        "Cannot make a move that leaves or puts your king in check."
      );
      // Revert the move
      this.updatePiecePosition(selectedChessPiece, originalPosition);
      return;
    }

    this.executeMove(selectedChessPiece, targetPiece, newPosition);
    this.finalizeMove();

    console.log(this.isCheck());
    // console.log(this.isCheckMate());
  }

  simulateMove(piece, newPosition) {
    // Save the original state
    const originalPosition = { ...piece.position };
    const targetPiece = this.chessboard.findPieceAt(
      newPosition.row,
      newPosition.col
    );

    // Simulate the move
    this.updatePiecePosition(piece, newPosition);
    let captured;
    if (targetPiece) {
      captured = { ...targetPiece.position };
      this.chessboard.board[captured.row][captured.col] = null; // Remove the captured piece from the board
    }

    // Check if the move results in check
    const isInCheckAfterMove = this.isCheck();

    // Revert the board to the original state
    this.updatePiecePosition(piece, originalPosition);
    if (captured) {
      this.chessboard.board[captured.row][captured.col] = targetPiece; // Put the captured piece back
    }

    // Return whether the move is safe (i.e., not resulting in check)
    return !isInCheckAfterMove;
  }
}
