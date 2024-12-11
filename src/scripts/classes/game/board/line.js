import BoardDimensions from './dimensions.js';
import Square from './square.js';

export default class Row extends BoardDimensions {
  #length;
  #squares;
  constructor() {
    this.#length = super(y);
    this.#squares = Array.from(
      { length: this.#length }, () => new Square()
    );
  }
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
