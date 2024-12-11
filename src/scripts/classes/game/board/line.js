import BoardDimensions from './board-dimensions.js';
import Square from './square.js';

export default class Row extends BoardDimensions {
  #length = super(y);
  #squares = Array.from({ length: this.#length }, () => new Square());
  get squares() {
    return this.#squares;
  }
  squareAt(index) {
    return this.#squares[index];
  }
  isFull() {
    return this.#squares().every(square => square.marker !== 0);
  }

  isWinning() {
    return this.#squares().every(square => square.marker === this.#squares[0].marker);
  }
};
