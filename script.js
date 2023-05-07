
const TicTacToeBoard = (function () {
  function create(boardSize, callback) {
    const board = Array.from({length: boardSize}, () => new Array(boardSize).fill(null));
    const boardElem = document.querySelector('.board')
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell', 'material-symbols-outlined', 'md-lg')
        cell.addEventListener('click', () => {
          callback(i, j);
          GameFlowController.turn()
          if (turnCheck === true) {
            cell.innerHTML = 'close'
          } else if (turnCheck === false) {
            cell.innerHTML = 'circle'
          }
        })
        boardElem.appendChild(cell)
        board[i][j] = cell
      }
    }
    return board
  }
  return {
    create
  }
})()

const GameFlowController = (function () {
  let isPlayer1Turn = true
  const displayTurn = document.getElementById('turn-display')

  function turn () {
    isPlayer1Turn = isPlayer1Turn ? false : true;
    turnCheck = isPlayer1Turn
    display()
    return turnCheck
  }
  function display () {
    if (isPlayer1Turn === true) {
      displayTurn.innerHTML = 'Player 1'
    } else {
      displayTurn.innerHTML = 'Player 2'
    }
  }
  return { turn }
})()

const board = TicTacToeBoard.create(3,(row, col) => {
  console.log(`Cell clicked! Row ${row} on Col ${col}`)
  console.log(board)
})

// const playerFactory = (name, shape) => {
//   return { name, shape };
// }