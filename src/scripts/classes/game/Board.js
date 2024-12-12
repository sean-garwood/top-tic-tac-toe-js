import Dimensions from './board/Dimensions.js';
import Line from './board/Line.js';

export default class Board extends Dimensions {
  #numberOfRows;
  #numberOfColumns;
  #numberOfDiagonals;
  #rows;
  constructor() {
    super();
    this.#numberOfRows = Dimensions.y;
    this.#numberOfColumns = Dimensions.x;
    this.#numberOfDiagonals = Dimensions.numberOfDiagonals;
    this.#rows = this.#initializeRows();
  }

  getMarkerAt(row, col) {
    return this.getSquareAt(row, col).marker;
  }

  getMarkerValueAt(row, col) {
    return this.getSquareAt(row, col).markerValue;
  }

  setMarkerAt(row, col, value) {
    const square = this.getSquareAt(row, col);
    square.mark(value);
  }

  getSquareAt(row, col) {
    return this.#rows[row].squares[col];
  }

  isWinning() {
    return this.#rows
      .some(row => row.isWinning()) ||
      this.#getColumns()
        .some(column => column.isWinning()) ||
      this.#getDiagonals()
        .some(diagonal => diagonal.isWinning());
  }

  #getColumns() {
    let columns = this.#linesTemplate(this.#numberOfColumns);
    for (let i = 0; i < this.#numberOfColumns; i++) {
      for (let j = 0; j < this.#numberOfRows; j++) {
        columns[i].setSquareAt(j, this.getMarkerValueAt(j, i));
      }
    }
    return columns;
  }

  #getDiagonals() {
    let diagonals = this.#linesTemplate(this.#numberOfDiagonals);
    for (let i = 0; i < this.#numberOfRows; i++) {
      diagonals[0].setSquareAt(i, this.getMarkerValueAt(i, i));
      diagonals[1].setSquareAt(i, this.getMarkerValueAt(i, this.#numberOfRows - 1 - i));
    }
    return diagonals;
  }

  #initializeRows() {
    return this.#linesTemplate(this.#numberOfRows);
  }

  #linesTemplate(numberOfLines) {
    return Array.from(
      { length: numberOfLines }, () => new Line());
  }

  print() {
    // pretty print the board
    this.#rows.forEach(row => {
      console.log(row.squares.map(square => square.marker));
    });
  }
}
