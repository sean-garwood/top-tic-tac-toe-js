import Line from './board/line.js';
import BoardDimensions from './board/dimensions.js';

export default class Board extends BoardDimensions {
  #width;
  #height;
  #rows;
  constructor() {
    super();
    this.#width = super.x;
    this.#height = super.y;
    this.#rows = Array.from(
      { length: this.#height }, () => new Line()
    );
  }
  get isWon() {
    return this.#lines().some(line => line.isWinning());
  }

  #columns() {
    return this.#rows.reduce((columns, row) => {
      row.squares.forEach((square, index) => {
        columns[index] = columns[index] || [];
        columns[index].push(square);
      });
      return columns;
    }, []);
  }

  #diagonals() {
    const diagonals = [[], []];
    this.#rows.forEach((row, rowIndex) => {
      row.squares.forEach((square, squareIndex) => {
        if (rowIndex === squareIndex) {
          diagonals[0].push(square);
        }
        if (rowIndex + squareIndex === this.#width - 1) {
          diagonals[1].push(square);
        }
      });
    });
    return diagonals;
  }

  #lines() {
    return this.#rows.concat(this.#columns(), this.#diagonals());
  }

};

let board = new Board();
