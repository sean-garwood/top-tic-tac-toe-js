const game = (function () {
  const board = (function (dimension = 3) {
    const numberOfColumns = dimension;
    let columns = [
      [0, 0, 0],   // OPTIMIZE
      [0, 0, 0],
      [0, 0, 0]
    ];
    const rows = function () {
      let boardRows = [];
      for (let n = 0; n < numberOfColumns; n++) {
        let nthRow = [];
        for (let m = 0; m < numberOfColumns; m++) {
          nthRow.push(columns[n][m]);
        }
        boardRows.push(nthRow);
      }
      return boardRows;
    };
    const diagonals = function () {
      const downDiag = (() => {
        let diag = [];
        for (let i = 0; i < numberOfColumns;) {
          for (let j = numberOfColumns; j-- > 0;) {
            diag.push(columns[i++][j])
          }
        }
        return diag;
      })();

      const upDiag = (() => {
        let diag = [];
        for (let i = numberOfColumns; i-- > 0;) {
          for (let j = 0; j < numberOfColumns;) {
            diag.push(columns[i--][j++])
          }
        }
        return diag;
      })();
      return [downDiag, upDiag];
    };
    const printBoard = function (turnNum) {
      const rowsToPrint = rows();
      const header = `------Turn ${turnNum}------`;
      const footer = '-----------------';
      console.log(header);
      for (let i = 0; i < board.numberOfColumns;) {
        let row = rowsToPrint[i++].join(' | ');
        console.log(` ${row} `);
      }
      console.log(footer);
    };

    return { numberOfColumns, columns, rows, diagonals, printBoard };
  })();

  const controller = (function () {
    const maxTurns = 9;
    let playerNumber = 1;
    let turnNumber = 1;
    const players = (function () {
      const p1 = createPlayer(1);
      const p2 = createPlayer(2);

      return { p1, p2 };

      function createPlayer() {
        const piece = playerNumber;
        const name = `Player ${(playerNumber++).toString()}`;
        let isWinner = false;
        console.warn(`Created ${name}`)

        return { piece, name, isWinner };
      }
    })();

    const checkResult = function () {
      let result = 0;

      const getLines = (function () {
        // OPTIMIZE: I'm sure there is an array library function that achieves
        //           this and is much cleaner
        const allLines = (function () {
          let lines = [];
          [board.rows(), board.columns, board.diagonals()].forEach((collection) => {
            collection.forEach((line) => {
              lines.push(line);
            });
          });

          return lines;
        })();

        return allLines;
      })();

      getLines.forEach((line) => {
        const ones = line.filter(i => i === 1);
        const twos = line.filter(j => j === 2);
        if (ones.length === board.numberOfColumns) { result = 1 }
        else if (twos.length === board.numberOfColumns) { result = 2 };
      });
      return result;
    };

    const takeTurn = function () {
      const player = (turnNumber % 2) ? players.p1 : players.p2;
      const randomCoord = () => {
        return Math.floor(Math.random() * 100) % board.numberOfColumns;
      };


      const tryToPlacePiece = function (m, n) {
        const boardIsEmptyAt = function () {
          const occupied = (board.columns[n][m] !== 0) ? true : false;
          const empty = !occupied;

          if (occupied) {
            console.error(`highly illegal, ${player.name}. Try again`);
            return occupied;
          }

          return empty;
        };

        const placePiece = (row, col) => {
          board.columns[col][row] = player.piece;
        };

        if (boardIsEmptyAt(m, n)) {
          placePiece(m, n);
          return true;
        }
        return false;
      }
      const doTakeTurn = function () {
        const chosenRow = randomCoord();
        const chosenCol = randomCoord();

        console.warn(`your turn, ${player.name}.`);
        if (!tryToPlacePiece(chosenRow, chosenCol)) {
          return;
        };
        console.warn(`${player.name} placed on row ${chosenRow}, col ${chosenCol}.`);
        board.printBoard(turnNumber++);
      };

      if ((turnResult = checkResult()) !== 0) {
        winner = (turnResult === 1) ? players.p1 : players.p2;
        console.warn(`you win, ${winner.name}!`);
        winner.isWinner = true;
      }
      else {
        doTakeTurn();
      }
      return turnResult;
    };
    while (takeTurn() === 0 && turnNumber < maxTurns) { ; }
  })();
})();
