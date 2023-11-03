import Observer from "./Observer.js";
export default class ChessboardObserver extends Observer {
  constructor(name) {
    super();
    this.name = name;
  }

  update(currentPosition, newPosition) {
    // console.log(`${this.name} received data:`, data);
    // Overrided and implemented in gameLogic
  }
}
