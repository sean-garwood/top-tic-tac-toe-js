export default class Square {
  static markers = ['X', 'O'];
  #markerValue = 0;
  #marker = null;

  get marker() { return this.#marker; }
  set marker(value) { this.#marker = value; }
  get markerValue() { return this.#markerValue; }
  set markerValue(value) { this.#markerValue = value; }

  #markX() {
    this.#markerValue = 1;
    this.#marker = Square.markers[0];
  }
  #markO() {
    this.#markerValue = 2;
    this.#marker = Square.markers[1];
  }
  mark(playerNumber) {
    playerNumber % 2 === 0 ? this.#markO() : this.#markX();
  }
}
