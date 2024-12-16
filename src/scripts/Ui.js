import Game from './classes/Game.js';

export default class UI {
  constructor(playerNames) {
    this.game = new Game(playerNames);
    this.players = this.game.players;
    this.board = this.game.board;
    this.cells = document.querySelectorAll('.cell');
    this.errorList = document.getElementById('errors-list');
    this.playerTurnInfoElement = document.getElementById('player-turn');

    this.displayPlayerTurn();
    this.addCellListeners();
  }

  addCellListeners() {
    this.cells.forEach(cell => {
      cell.addEventListener('click', () => {
        this.turnListener(cell);
      });
    });
  }

  clearErrors() {
    this.errorList.innerHTML = '';
    this.errorList.style.display = 'none';
  }

  clearPlayerTurn() {
    this.playerTurnInfoElement.innerText = '';
  }

  displayPlayerTurn() {
    const currentPlayer = this.getCurrentPlayer();
    this.playerTurnInfoElement.innerText = `Your turn, ${currentPlayer.name}.`;
  }

  displayErrors(errors) {
    this.clearErrors();
    this.errorList.style.display = 'block';
    errors.forEach((error) => {
      const li = document.createElement('li');
      this.errorList.appendChild(li);
      li.innerText = error;
    });
  }

  getCurrentPlayer() {
    let player;
    if (this.game.turnNumber % 2) {
      player = this.players.p1;
    } else {
      player = this.players.p2;
    }
    return player;
  }

  printGameResult(outcome) {
    const winnerParagraph = document.getElementById('winner-name');
    const winnerSpan = document.getElementById('winner');
    winnerParagraph.style.display = 'block';
    this.clearPlayerTurn();
    if (outcome === Game.turnOutcomes.DRAW) {
      winnerSpan.innerText = 'It\'s a draw!';
    }
    else {
      winnerSpan.innerText = this.game.winner.name + ' wins!';
    }
  }

  removeCellListeners() {
    this.cells.forEach(cell => {
      const newCell = cell.cloneNode(true);
      cell.parentNode.replaceChild(newCell, cell);
    });
  }

  turnListener(cell) {
    const row = parseInt(cell.getAttribute('data-row'));
    const col = parseInt(cell.getAttribute('data-col'));
    const currentPlayer = this.getCurrentPlayer();
    const piece = currentPlayer.marker;
    const turnOutcome = this.game
      .takeTurn(currentPlayer, row, col);

    switch (turnOutcome) {
      case Game.turnOutcomes.INVALID_MOVE:
        this.displayErrors(['Cell is already taken']);
        break;
      case Game.turnOutcomes.DRAW:
      case Game.turnOutcomes.WIN_P1:
      case Game.turnOutcomes.WIN_P2:
        cell.innerText = piece;
        this.removeCellListeners();
        this.printGameResult(turnOutcome);
        break;
      case Game.turnOutcomes.CONTINUE:
        cell.innerText = piece;
        this.clearErrors();
        this.displayPlayerTurn();
        break;
    }
  }
}
