import UI from './Ui.js';
addEventListener('DOMContentLoaded', () => {
  document.getElementById('form')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const player1 = form.elements['player1'].value;
      const player2 = form.elements['player2'].value;
      document.querySelector('.form-dialog')
        .style.display = 'none';
      new UI([player1, player2]);
    });
});
