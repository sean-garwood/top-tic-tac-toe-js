// Tic-tac-toe

/*
 * models:
 * board
 * users
 * pieces?
 * messages
 *
 * views:
 * cli => webpage
 *
 * controllers:
 * cli: messages
 * webpage:
 *   listeners
 *     clicks
 *     game ending?
 *   renderers
 *     state
 */
const game = (function () {
  let turnNumber = 0;
  const p1 = createPlayer(1);
  const p2 = createPlayer(2);

  const incrementTurnNumber = () => { turnNumber++ };

  function createPlayer(number) {
    const pieces = ['', 'x', 'y']
    const piece = () => number.odd ? pieces[1] : pieces[2]
    const name = number;

    // TODO: place piece goes here?

    return { piece, name };
  }

  const board = (function () {
    // OPTIMIZE: Quite rigid
    const columns = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];

    const checkWinConditions = function () {
      // check for sum of 3 or 6 in:
      //   row
      //   col
      //   diag
      const getCol = (board) => { };
      const getRow = (board) => { };
      const getDiags = (board) => { };
      // sum functions etc
      // OPTIMIZE: Metaprogram
    }
  }());

  function takeTurn(player) {
    //check wincon
    console.log("your turn, Player ${player.name}.");
    // get input as row/col coords?
    //   transpose  to setPiece
    // log output
    // bump turn
  }
});


/*
 * game
 *
 *     board
 *         col
 *     player
 *         piece
 *
 *
 *
 */
