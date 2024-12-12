import Square from './board/Square.js';
export default class Player {
  // start playerNumber at 1, increment with each new player
  // piece is 'X' for player 1, 'O' for player 2
  static playerNumber = 1;
  static markers = Square.markers;
  constructor(name) {
    this.name = name;
    this.number = Player.playerNumber++;
    this.marker = (this.number % 2) ? Square.markers[0] : Square.markers[1];
  }
}
