import { initializePlayers } from './modules/game/players.js';
import { initializeBoard } from './modules/game/board.js';
import { initializeGame } from './modules/game.js';
import { ui } from './modules/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initializePlayers((players) => {
    const board = initializeBoard(3); // Example usage with a 3x3 board
    initializeGame(players, board, (game) => {
      ui.initializeUI(game, players, board);
    });
  });
});
