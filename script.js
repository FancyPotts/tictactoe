// const displayController = (function () {
//   let turn = player1Turn ? player1Action() : player2Action();
// })();

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
        cell.classList.add('cell', 'material-symbols-outlined')
        cell.addEventListener('click', () => {
          callback(i, j);
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

const board = TicTacToeBoard.create(3,(row, col) => {
  console.log(`Cell clicked! Row ${row} on Col ${col}`)
  console.log(board)
})
