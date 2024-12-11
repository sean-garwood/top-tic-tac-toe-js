const ui = (function () {
  let game;
  let players;
  let board;

  function initializeUI(gameInstance, playersInstance, boardInstance) {
    game = gameInstance;
    players = playersInstance;
    board = boardInstance;

    const cells = document.querySelectorAll('.cell');
    const errorList = document.getElementById('errors-list');
    const playerTurnInfoElement = document.getElementById('player-turn');

    displayPlayerTurn();
    addCellListeners();

    function addCellListeners() {
      cells.forEach(cell => {
        cell.addEventListener('click', () => {
          turnListener(cell);
        });
      });
    }

    function clearErrors() {
      errorList.innerHTML = '';
      errorList.style.display = 'none';
    };

    function clearPlayerTurn() {
      playerTurnInfoElement.innerText = '';
    }

    function displayPlayerTurn() {
      const currentPlayer = getCurrentPlayer();
      playerTurnInfoElement.innerText = `Your turn, ${currentPlayer.name}.`;
    };

    function displayErrors(errors) {
      clearErrors();
      errorList.style.display = 'block';
      errors.forEach((error) => {
        const li = document.createElement('li');
        errorList.appendChild(li);
        li.innerText = error;
      });
    };

    function getCurrentPlayer() {
      let player;
      if (game.turnNumber % 2) {
        player = players.p1;
      } else {
        player = players.p2;
      }
      return player;
    }

    function printGameResult(outcome) {
      const winnerParagraph = document.getElementById('winner-name');
      const winnerSpan = document.getElementById('winner');
      winnerParagraph.style.display = 'block';
      clearPlayerTurn();
      switch (outcome) {
        case game.turnOutcomes.WIN_P1:
          winnerSpan.innerText = players.p1.name;
          break;
        case game.turnOutcomes.WIN_P2:
          winnerSpan.innerText = players.p2.name;
          break;
        case game.turnOutcomes.DRAW:
          winnerSpan.innerText = 'Nobody wins. Cat\'s game. Draw.';
          break;
      }
    }

    function removeCellListeners() {
      cells.forEach(cell => {
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
      });
    }

    function turnListener(cell) {
      const row = parseInt(cell.getAttribute('data-row'));
      const col = parseInt(cell.getAttribute('data-col'));
      const piece = getCurrentPlayer().piece;
      const outcomes = game.turnOutcomes;
      const outcome = game.takeTurn(row, col);
      switch (outcome) {
        case outcomes.INVALID_MOVE:
          displayErrors(['Cell is already taken']);
          break;
        case outcomes.DRAW:
        case outcomes.WIN_P1:
        case outcomes.WIN_P2:
          cell.innerText = piece;
          removeCellListeners();
          printGameResult(outcome);
          break;
        case outcomes.CONTINUE:
          cell.innerText = piece;
          clearErrors();
          displayPlayerTurn();
          break;
      }
    }
  }

  return { initializeUI };
})();

export { ui };
