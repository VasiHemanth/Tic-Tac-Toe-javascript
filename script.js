const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNNING_COMBINATION = [ 
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('ResultMsg')
const dataWinMsg = document.querySelector('[data-display-msg]')
const restartbutton = document.getElementById('RestartButton')
let oTurn 


restartbutton.addEventListener('click', startGame)

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener( 'click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

startGame()

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS 
    placeMark( cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    }
    else if(isDraw()) {
        endGame(true)
    } 
    else {
    swapTurn()
    setBoardHoverClass()
    }
    
} 

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurn() {
    oTurn = !oTurn
} 
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}
function checkWin(currentClass) {
    return WINNNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if(draw) {
        dataWinMsg.innerText = 'Draw!' 
    } else {
        dataWinMsg.innerText = `${oTurn ? "O's" : "X's"} Wins!` 
    }
    winningMessageElement.classList.add('show')
}

function isDraw (draw) {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(O_CLASS)
    })     
}