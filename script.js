const TicTacToeBoard = (function () {
  function create(boardSize, callback) {
    const board = Array.from({length: boardSize}, () => new Array(boardSize).fill(null));
    const boardElem = document.createElement('div')
    boardElem.classList.add('board')
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell', 'material-symbols-outlined', 'md-lg')
        cell.addEventListener('click', () => {
          callback(i, j);
          if (cell.innerHTML === '') {
            GameFlowController.turn()
            if (turnCheck === true) {
              cell.innerHTML = player2.shape
            } else if (turnCheck === false) {
              cell.innerHTML = player1.shape
            }
          } else {
            return
          }
        })
        boardElem.appendChild(cell)
        board[i][j] = cell
        document.body.appendChild(boardElem)
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
  const turnDisplay = document.createElement('div')
  turnDisplay.setAttribute('id', 'turn-display')
  function turn () {
    isPlayer1Turn = isPlayer1Turn ? false : true;
    turnCheck = isPlayer1Turn
    display()
    return turnCheck
  }
  function display () {
    if (isPlayer1Turn === true) {
      turnDisplay.innerHTML = player1.name
    } else {
      turnDisplay.innerHTML = player2.name
    }
  }
  document.body.appendChild(turnDisplay)
  return {
    turn
  }
})()

const board = TicTacToeBoard.create(3,(row, col) => {
  console.log(`Cell clicked! Row ${row} on Col ${col}`)
  console.log(board)
})

const playerFactory = (name, shape) => {
  return { name, shape }
}

const player1 = playerFactory('Player 1', 'circle')
const player2 = playerFactory('Player 2', 'close')

// Check if square is null, act.