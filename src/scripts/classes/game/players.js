function initializePlayers(callback) {
  const dialog = document.querySelector('dialog');
  const playerForm = document.querySelector('form');
  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerOneName = document.querySelector('#player1').value;
    const playerTwoName = document.querySelector('#player2').value;
    const players = (function () {
      let playerNumber = 1;
      const p1 = createPlayer(playerOneName);
      const p2 = createPlayer(playerTwoName);

      return { p1, p2 };

      function createPlayer(playerName) {
        // sanitize player name
        const name = playerName.trim().replace(/[^a-zA-Z0-9]/g, '');
        const number = playerNumber;
        const piece = (playerNumber++ % 2) ? 'X' : 'O';

        console.warn(`Player ${number}: ${name} - Piece: ${piece}`);
        return { name, number, piece };
      }
    })();

    dialog.close();
    callback(players);
  });
}

export { initializePlayers };
