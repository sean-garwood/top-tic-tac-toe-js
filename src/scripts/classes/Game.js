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
  constructor(playerNames) {
    this.#players = {
      p1: new Player(playerNames[0]),
      p2: new Player(playerNames[1])
    };
    this.#board = new Board();
    this.#turnNumber = 1;
    this.#winner = null;
  }

  get board() { return this.#board; }
  get players() { return this.#players; }
  get turnNumber() { return this.#turnNumber; }
  get winner() { return this.#winner; }

  takeTurn(player, row, col) {
    if (this.#board.getMarkerAt(row, col)) {
      return Game.turnOutcomes.INVALID_MOVE;
    }

    this.#board.setMarkerAt(row, col, player.number);
    const wonBoard = this.#board.isWinning();
    const turnLimitReached = this.#turnNumber >= Game.maxTurns;
    const gameOver = wonBoard || turnLimitReached;
    if (gameOver) {
      if (wonBoard) {
        this.#winner = player;
        return Game.turnOutcomes['WIN_P' + player.number];
      }
      return Game.turnOutcomes.DRAW;
    }

    this.#turnNumber++;
    return Game.turnOutcomes.CONTINUE;
  }
}
