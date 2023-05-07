

// const playerFactory = (name, shape) => {
//   return { name, shape };
// };

const TicTacToeBoard = (function () {
  function create(boardSize, callback) {
    const board = Array.from({length: boardSize}, () => new Array(boardSize).fill(null));
    const boardElem = document.querySelector('.board');
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'material-symbols-outlined', 'md-lg')
        cell.addEventListener('click', () => {
          callback(i, j);
          displayController.turn();
          if (cell.innerHTML === '') {
            cell.innerHTML = 'close'
          } else if (cell.innerHTML === 'close') {
            cell.innerHTML = 'circle'
          } else if (cell.innerHTML === 'circle') {
            cell.innerHTML = ''
          }
        })
        boardElem.appendChild(cell)
        board[i][j] = cell
      }
    }
    return board
  }
  return {
    create,
  }
})()

const displayController = (function () {
  let isPlayer1Turn = true;
  function turn () {
    isPlayer1Turn = isPlayer1Turn ? false : true;
    console.log(isPlayer1Turn)
  }
  return { turn, turnCheck }
})();

const board = TicTacToeBoard.create(3,(row, col) => {
  console.log(`Cell clicked! Row ${row} on Col ${col}`)
  console.log(board) 
})
