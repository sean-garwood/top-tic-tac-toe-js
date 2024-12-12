import Player from './game/Player.js';
import Board from './game/Board.js';
export default class Game {
  #players;
  #board;
  #turnNumber;
  #winner;
  static turnOutcomes = {
    INVALID_MOVE: -2,
    DRAW: -1,
    CONTINUE: 0,
    WIN_P1: 1,
    WIN_P2: 2
  };
  static maxTurns = 9;
  constructor() {
    this.#players = {
      p1: new Player('Player 1'), // TODO: dynamic names
      p2: new Player('Player 2')
    };
    this.#board = new Board();
    this.#turnNumber = 1;
    this.#winner = this.#play();
    this.#announceWinner();
  }

  #takeTurn(player, row, col) {
    if (this.#board.getMarkerAt(row, col)) {
      return Game.turnOutcomes.INVALID_MOVE;
    }
    this.#board.setMarkerAt(row, col, player.number);
    this.#turnNumber++;
    this.#board.print();
    const gameOver = this.#board.isWinning()
    return gameOver ? player.number : Game.turnOutcomes.CONTINUE;
  }

  #play() {
    do {
      const player = this.#turnNumber % 2
        ? this.#players.p1
        : this.#players.p2;
      const row = Math.floor(Math.random() * 3); // debug
      const col = Math.floor(Math.random() * 3);
      const outcome = this.#takeTurn(player, row, col);
      if (outcome > Game.turnOutcomes.CONTINUE) {
        this.#winner = outcome;
        return outcome;
      }
    } while (this.#turnNumber <= Game.maxTurns && !this.#winner);

    if (!this.#winner) {
      return Game.turnOutcomes.DRAW;
    }
    else {
      return this.#winner;
    }
  }

  #announceWinner() {
    switch (this.#winner) {
      case Game.turnOutcomes.WIN_P1:
        console.log(`${this.#players.p1.name} wins!`);
        break;
      case Game.turnOutcomes.WIN_P2:
        console.log(`${this.#players.p2.name} wins!`);
        break;
      case Game.turnOutcomes.DRAW:
        console.log('It\'s a draw!');
        break;
      default:
        console.log('Error: invalid outcome');
    }
    this.#board.print();
  }
}

// debug
const game = new Game();
