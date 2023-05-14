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
          callback(i, j, cell)
        })
        boardElem.appendChild(cell)
        board[i][j] = cell
      }
    }
    const field = document.querySelector('fieldset')
    const innerField = document.createElement('div')
    const displayBox = document.getElementById('turn-display')
    field.insertBefore(innerField, displayBox)
    innerField.appendChild(boardElem)
    return board
  }
  return {
    create
  }
})()

const GameFlowController = (function () {
  let isPlayer1Turn = true
  let winnerShape = null
  const turnDisplay = document.createElement('div')
  const boxInBox = document.querySelector('fieldset')
  turnDisplay.setAttribute('id', 'turn-display')
  turnDisplay.textContent = 'Player 1 goes first!'
  boxInBox.appendChild(turnDisplay)
  function turn (row, col, cell) {
    isPlayer1Turn = !isPlayer1Turn
    display()
    if (cell.textContent !== '') {
      return
    }
    switch (isPlayer1Turn) {
      case true:
        cell.textContent = player2.shape
        break
      case false:
        cell.textContent = player1.shape
        break
    }
    winnerShape = GameFlowController.checkWinner(board)
    if (winnerShape !== null) {
      if (winnerShape === player1.shape) {
        turnDisplay.innerHTML = 'Player 1 wins!'
        setTimeout(() => {
          turnDisplay.innerHTML += ' Try again?'
        }, 1500)
      } else {
        turnDisplay.innerHTML = 'Player 2 wins!'
        setTimeout(() => {
          turnDisplay.innerHTML += ' Try again?'
        }, 1500)
      }
    }
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
  function resetBoard () {
    for (let row of board) {
      for (let cell of row) {
        cell.textContent = ''
      }
    }
    isPlayer1Turn = true
    winnerShape = null

    turnDisplay.textContent = 'Board reset!'
    setTimeout(() => {
      turnDisplay.textContent = 'Player 1 goes first!'
    }, 1000)
  }
  const resetButton = document.getElementById('reset')
  resetButton.addEventListener('click', resetBoard)
  return {
    turn,
    checkWinner
  }
})()

const board = TicTacToeBoard.create(3, (row, col, cell) => {
  GameFlowController.turn(row, col, cell)
  // console.log(`Cell clicked! Row ${row} on Col ${col}`)
  // console.log(board)
})

const playerFactory = (name, shape) => {
  return { name, shape }
}

const player1 = playerFactory('Player 1', 'circle')
const player2 = playerFactory('Player 2', 'close')

// other shape options: bolt, star, token, heart_broken, favorite. fonts.google.com/icons for more.
