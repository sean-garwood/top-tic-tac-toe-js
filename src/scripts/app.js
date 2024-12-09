const game = (function () {

  const maxTurns = 9;
  let playerNumber = 1;
  let turnNumber = 1;
  let winner = null;

  const board = (function (dimension = 3) {
    const numberOfRows = dimension;
    let rows = [
      [0, 0, 0],   // OPTIMIZE
      [0, 0, 0],
      [0, 0, 0]
    ];

    const columns = function () {
      let cols = [];
      for (let n = 0; n < numberOfRows; n++) {
        let nthCol = [];
        for (let m = 0; m < numberOfRows; m++) {
          nthCol.push(rows[m][n]);
        }
        cols.push(nthCol);
      }
      return cols;
    };

    const diagonals = function () {
      const downDiag = (() => {
        let down = [];
        for (let m = 0; m < numberOfRows; m++) {
          down.push(rows[m][m])
        }
        return down;
      })();

      const upDiag = (() => {
        let up = [];
        // start at row 2, col 0
        // push into up
        //   row 2, col 0
        //   row 1, col 1
        //   row 0, col 2
        for (let m = numberOfRows - 1, n = 0; m >= 0; m--, n++) {
          up.push(rows[m][n]);
        };
        return up;
      })();

      return [downDiag, upDiag];
    };

    const printBoard = function (turnNum) {
      const header = `------Turn ${turnNum}------`;
      const footer = '-----------------';
      console.log(header);
      for (let i = 0; i < numberOfRows;) {
        console.log(` ${rows[i++].join(' | ')} `);
      }
      console.log(footer);
    };

    const isEmptyAt = function (m, n) {
      return rows[m][n] === 0;
    };

    return { numberOfRows, columns, rows, diagonals, printBoard, isEmptyAt };
  })();

  const players = (function () {
    const p1 = createPlayer(1);
    const p2 = createPlayer(2);

    return { p1, p2 };

    function createPlayer() {
      const piece = playerNumber;
      const name = `Player ${(playerNumber++).toString()}`;
      console.warn(`Created ${name}`)

      return { piece, name };
    }
  })();

  const checkResult = function () {
    let result = 0;

    const getLines = (function () {
      // OPTIMIZE: I'm sure there is an array library function that achieves
      //           this and is much cleaner
      const allLines = (function () {
        let lines = [];
        [board.rows, board.columns(), board.diagonals()]
          .forEach((collection) => {
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
      if (ones.length === board.numberOfRows) { result = 1 }
      else if (twos.length === board.numberOfRows) { result = 2 };
    });
    return result;
  };

  const takeTurn = function () {
    const player = (turnNumber % 2) ? players.p1 : players.p2;
    board.printBoard(turnNumber);

    const randomCoord = () => {
      return Math.floor(Math.random() * 100) % board.numberOfRows;
    };

    const tryToPlacePiece = function (m, n) {
      const placePiece = (row, col) => {
        board.rows[row][col] = player.piece;
      };

      if (board.isEmptyAt(m, n)) {
        placePiece(m, n);
        turnNumber++;
        return true;
      }
      else {
        console.error(`
            *********ERROR ILLEGAL MOVE*********
            ${player.name} tried to place on row ${m}, col ${n}.
            THE BOARD IS OCCUPIED AT THAT POSITION BY
             ${board.rows[m][n] % 2 ? players.p1.name : players.p2.name}.`);
        return false;
      }
    }

    const doTakeTurn = function () {
      const chosenRow = randomCoord();
      const chosenCol = randomCoord();

      console.warn(`your turn, ${player.name}.`);
      if (!tryToPlacePiece(chosenRow, chosenCol)) {
        return;
      };
      console.warn(`${player.name} placed on row ${chosenRow},
        col ${chosenCol}.`);
    };

    doTakeTurn();
    if (turnNumber >= 5) {
      const gameResult = checkResult();
      if (gameResult) {
        winner = (gameResult === 1) ? players.p1 : players.p2;
        console.warn(`you win, ${winner.name}!`);
        return gameResult;
      }
    }
    return 0;
  };

  while ((takeTurn() === 0) && (turnNumber <= maxTurns)) { ; }
  if (winner === null) {
    console.log('It\'s a draw!');
  }
  else {
    console.log(`The winner is ${winner.name}!`);
  }
  console.log('final position:');
  board.printBoard(--turnNumber);
})();
