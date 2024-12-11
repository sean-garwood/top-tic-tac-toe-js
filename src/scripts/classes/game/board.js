export default class Board extends BoardDimensions {
  #width = super(x);
  #height = super(y);
  #rows = Array.from({ length: this.#height }, () => new Line());
  get rows() {
    return this.#rows;
  }

  columns() {
    return this.#rows.reduce((columns, row) => {
      row.squares.forEach((square, index) => {
        columns[index] = columns[index] || [];
        columns[index].push(square);
      });
      return columns;
    }, []);
  }

  diagonals() {
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

  lines() {
    return this.#rows.concat(this.columns(), this.diagonals());
  }

  isWon() {
    return this.lines().some(line => line.isWinning());
  }
};
