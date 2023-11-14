## Piece movement
- The chessboard uses the Observer design pattern. Basically, the chessboard publishes events to its subscribers (Gamelogic), and Gamelogic will react to events from the chessboard. 

- At the current time of this being written, the chessboard only publishes movement to GameLogic.

- When valid tiles are picked on the board, the chessboard will notify GameLogic (chessboard.notify(currentPosition, targetPosition)) that something has been moved, which makes GameLogic move the piece using the  movePiece(currentPosition, newPosition) function, whose functionality is investigated below.

## Checking for "Check"
- This is done within GameLogic in the isCheck() method, after every move. 

- Scan through the entire board, looking for any piece that can attack the king.

- This is done through the GameLogic.canMoveToPosition(piece, targetPosition, currentPosition) function which checks if a chesspiece can attack targetPosition. Using the King's location as targetPosition, we can figure out if the King is threatened.

- isCheck() will basically check every piece if it has the ability to attack the King from its current position.

- If a single piece can attack the king, then it's check, otherwise it isn't check.

## Validity of moving a piece
- Each move needs to check the following: which player's turn it is, if the move is legal, if that move will place them into check, and whether or not they are in checkmate.

- Turn checking is just disallowing that weren't the currentPlayer's color to interact.

- The legality of a move depends on what chess piece it is, but generally: a piece can't move through other pieces, it's not out of bounds, it can't move onto other occupied spaces (unless it's an enemy), and it follows the movement pattern of the piece. Exceptions apply like the knight which can move through units, and the pawn whose attack pattern (forward-diagonal capture) is different than its movement pattern

- Check is discussed above, but what's important is the order the checking for "check" is done. The way it's implemented in movePiece is that the move is done on the board, and isCheck() is called to check if there's a "check". Then, it will undo this movement, and return the chessboard to its previous state.

- Checkmate is done similarly to check, but instead of checking if there's anything threatening the King, you check if there's any action the player (with their own pieces) can do to stop the King from being "checked". 
