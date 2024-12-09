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

    const checkResult = function () {
      let result = 0;

      const getLines = (function () {
        // OPTIMIZE: I'm sure there is an array library function that achieves
        //           this and is much cleaner
        const allLines = (function () {
          let lines = [];
          [rows, columns(), diagonals()]
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
        if (ones.length === numberOfRows) { result = 1 }
        else if (twos.length === numberOfRows) { result = 2 };
      });
      return result;
    };

    return { numberOfRows, rows, printBoard, isEmptyAt, checkResult };
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

  const printGameResult = function () {
    const winnerParagraph = document.getElementById('winner-name');
    const winnerSpan = document.getElementById('winner');
    if (winner === null) {
      if (turnNumber > maxTurns) {
        // make winnerParagraph visible (hiddne by default)
        winnerParagraph.style.display = 'block';
        winnerSpan.innerText = 'It\'s a draw!';
      }
    }
    else {
      winnerParagraph.style.display = 'block';
      winnerSpan.innerText = `${winner.name} wins!`;
    }
  }

  function handleButtonClick(row, col, button) {
    const player = (turnNumber % 2) ? players.p1 : players.p2;
    if (board.isEmptyAt(row, col)) {
      board.rows[row][col] = player.piece;
      button.innerText = player.piece === 1 ? 'X' : 'O';
      turnNumber++;
      if (turnNumber >= 5) {
        const gameResult = board.checkResult();
        if (gameResult) {
          winner = (gameResult === 1) ? players.p1 : players.p2;
          printGameResult();
          return;
        }
      }
    } else {
      console.error(`
            *********ERROR ILLEGAL MOVE*********
            ${player.name} tried to place on row ${row}, col ${col}.
            THE BOARD IS OCCUPIED AT THAT POSITION BY
             ${board.rows[row][col] % 2 ? players.p1.name : players.p2.name}.`);
    }
    printGameResult();
  }

  return { handleButtonClick, winner };
})();

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.cell');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const row = parseInt(button.getAttribute('data-row'));
      const col = parseInt(button.getAttribute('data-col'));
      game.handleButtonClick(row, col, button);
    });
  });
});
