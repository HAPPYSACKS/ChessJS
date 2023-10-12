let columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
let boardHTML = "";

for (let row = 0; row <= 8; row++) {
  for (let col of columns) {
    boardHTML += `<div class="square" id=${col}${row}></div>`;
  }
}

document.getElementById("chessboard").innerHTML = boardHTML;

class chessPiece {
  position;
  color;

  constructor(color, position) {
    this.color = color;
    this.position = position;
  }

  move(newPosition) {

  }

  capture(piece) {

  }
}

class Pawn extends chessPiece {
  firstMove = true;
  promote() {

  }
  move(newPosition) {
  }
  capture(piece) {
  }
}

class King extends chessPiece {

}

class Bishop extends chessPiece {

}

class Queen extends chessPiece {

}

class Rook extends chessPiece {

}