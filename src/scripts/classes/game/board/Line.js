import Dimensions from './Dimensions.js';
import Square from './Square.js';

export default class Line extends Dimensions {
  #length;
  #squares;
  constructor() {
    super();
    this.#length = Dimensions.x;
    this.#squares = Array.from(
      { length: this.#length }, () => new Square());
  }
  get length() {
    return this.#length;
  }
  get squares() {
    return this.#squares;
  }

  setSquareAt(index, value) {
    this.#squares[index].markerValue = value;
  }

  isWinning() {
    const markers = this.#squares.map(square => square.markerValue);
    return markers[0]
      && markers[0] === markers[1]
      && markers[1] === markers[2];
  }
};
