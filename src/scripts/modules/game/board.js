function initializeBoard(dimension = 3) {
  const numberOfRows = dimension;
  let rows = (function () {
    let boardRows = [];
    for (let i = 0; i < numberOfRows; i++) {
      let row = [];
      for (let j = 0; j < numberOfRows; j++) {
        row.push(0);
      }
      boardRows.push(row);
    }
    return boardRows;
  })();


  const isEmptyAt = function (m, n) {
    return rows[m][n] === 0;
  };

  const checkForWinner = function () {
    const columns = (function () {
      let cols = [];
      for (let n = 0; n < numberOfRows; n++) {
        let nthCol = [];
        for (let m = 0; m < numberOfRows; m++) {
          nthCol.push(rows[m][n]);
        }
        cols.push(nthCol);
      }
      return cols;
    })();

    const diagonals = (function () {
      const downDiag = (() => {
        let down = [];
        for (let m = 0; m < numberOfRows; m++) {
          down.push(rows[m][m])
        }
        return down;
      })();

      const upDiag = (() => {
        let up = [];
        for (let m = numberOfRows - 1, n = 0; m >= 0; m--, n++) {
          up.push(rows[m][n]);
        };
        return up;
      })();

      return [downDiag, upDiag];
    })();

    const isFull = (line) => {
      return line.every((cell) => cell !== 0);
    }

    const fullLines = (function () {
      let lines = [];
      [rows, columns, diagonals].forEach((collection) => {
        collection.filter((line) => isFull(line))
          .forEach((line) => lines.push(line));
      });

      return lines;
    })();

    const isWinningLine = (line) => {
      return line.every((cell) => cell === line[0]);
    }

    const winningLines = fullLines.filter((line) => isWinningLine(line));
    let result = 0;

    if (winningLines.length > 0) {
      result = winningLines[0][0];
    }
    else if (fullLines.length === numberOfRows * 2 + 2) {
      result = -1;
    }
    return result;
  };

  const reset = function () {
    rows.forEach(row => { row.fill(0); });
  };

  const setSquare = function (row, col, playerNumber) {
    return rows[row][col] = playerNumber;
  }

  return { rows, isEmptyAt, checkForWinner, reset, setSquare };
};

export { initializeBoard };
