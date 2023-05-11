// This is to make sure the shapes for tic tac toe is loaded before onclick events. The normal way would have shown normal text before changing briefly. IE "circle" before showing the icon.
window.addEventListener('load', function () {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
  document.head.appendChild(link)
})

const TicTacToeBoard = (function () {
  function create (boardSize, callback) {
    const board = Array.from({ length: boardSize }, () => new Array(boardSize).fill(null))
    const boardElem = document.createElement('div')
    boardElem.classList.add('board')
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell', 'material-symbols-outlined', 'md-lg')
        cell.addEventListener('click', () => {
          callback(i, j);
          if (cell.textContent !== '') {
            return
          }
          GameFlowController.turn()
          switch (turnCheck) {
            case true:
              cell.textContent = player2.shape
              GameFlowController.checkWinner(board)
              break
            case false:
              cell.textContent = player1.shape
              GameFlowController.checkWinner(board)
              break
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
  turnDisplay.innerHTML = 'Player 1 first!'
  function turn () {
    isPlayer1Turn = !isPlayer1Turn
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
  function checkWinner (board) {
    const boardSize = board.length
    for (let i = 0; i < boardSize; i++) {
      const firstCellValue = board[i][0].textContent
      if (firstCellValue === '') continue
      if (board[i].every((cell) => cell.textContent === firstCellValue)) {
        return firstCellValue
      }
    }
    for (let j = 0; j < boardSize; j++) {
      const firstCellValue = board[0][j].textContent
      if (firstCellValue === '') continue
      if (board.every((row) => row[j].textContent === firstCellValue)) {
        return firstCellValue
      }
    }
    const firstDiagonalCellValue = board[0][0].textContent
    if (firstDiagonalCellValue !== '') {
      if (board.every((row, index) => row[index].textContent === firstDiagonalCellValue)) {
        return firstDiagonalCellValue
      }
    }
    const lastDiagonalCellValue = board[0][boardSize - 1].textContent
    if (lastDiagonalCellValue !== '') {
      if (board.every((row, index) => row[boardSize - index - 1].textContent === lastDiagonalCellValue)) {
        return lastDiagonalCellValue
      }
    }
    return null
  }

  // create if block with switch if a winner is returned, checking against the players.

  document.body.appendChild(turnDisplay)
  return {
    turn,
    checkWinner
  }
})()

const board = TicTacToeBoard.create(3,(row, col) => {
  // console.log(`Cell clicked! Row ${row} on Col ${col}`)
  // console.log(board)
})

const playerFactory = (name, shape) => {
  return { name, shape }
}

const player1 = playerFactory('Player 1', 'close')
const player2 = playerFactory('Player 2', 'circle')

// other shape options: bolt, star, token, heart_broken, favorite. fonts.google.com/icons for more.
