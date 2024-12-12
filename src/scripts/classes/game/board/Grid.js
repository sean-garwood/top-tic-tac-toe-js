import Line from './line.js';

export default class Grid {
  #width;
  #height;
  #rows;
  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#rows = Array.from({ length: height }, () => new Line(width));
  }
  get rows() {
    return this.#rows;
  }
  get columns() {
    return Array.from({ length: this.#width }, (_, colIndex) =>
      new Line(this.#height).squares.map((_, rowIndex) => this.#rows[rowIndex].squares[colIndex])
    );
  }
  get diagonals() {
    const mainDiagonal = new Line(this.#width).squares.map((_, index) => this.#rows[index].squares[index]);
    const antiDiagonal = new Line(this.#width).squares.map((_, index) => this.#rows[index].squares[this.#width - 1 - index]);
    return [mainDiagonal, antiDiagonal];
  }
}
