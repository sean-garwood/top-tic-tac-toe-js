function initializeGame(players, board, callback) {
  const game = (function () {
    const turnOutcomes = {
      INVALID_MOVE: -2,
      DRAW: -1,
      CONTINUE: 0,
      WIN_P1: 1,
      WIN_P2: 2
    };
    const maxTurns = 9;
    let turnNumber = 1;
    let winner = null;

    function takeTurn(row, col) {
      let result = 0;
      const player = (turnNumber % 2) ? players.p1 : players.p2;
      if (board.isEmptyAt(row, col)) {
        board.setSquare(row, col, player.number);
        const winningPlayerNumber = board.checkForWinner();

        if (winningPlayerNumber) {
          result = winningPlayerNumber;
          winner = player;
        } else {
          if (turnNumber === maxTurns) {
            result = turnOutcomes.DRAW;
          } else {
            result = turnOutcomes.CONTINUE;
          }
        }
        turnNumber++;
      } else {
        result = turnOutcomes.INVALID_MOVE;
      }

      return result;
    }

    function reset() {
      board.reset();
      turnNumber = 1;
      winner = null;
    }

    return {
      maxTurns,
      turnOutcomes,
      get turnNumber() { return turnNumber; },
      get winner() { return winner; },
      reset,
      takeTurn
    };
  })();

  callback(game);
}

export { initializeGame };
