const Cross_Class = 'cross'
const Circle_Class = 'circle'
const winning_combination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('.board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton =  document.getElementById('restartButton')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)
function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(Cross_Class)
        cell.classList.remove(Circle_Class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? Circle_Class : Cross_Class
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass() 
    }
}

function endGame(draw) {
    if(draw){
        winningMessageTextElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')

}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(Cross_Class) ||
               cell.classList.contains(Circle_Class)
        })
}

function placeMark(cell,currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns() {
    circleTurn = !circleTurn
}
function setBoardHoverClass() {
    board.classList.remove(Cross_Class)
    board.classList.remove(Circle_Class)
    if (circleTurn){
        board.classList.add(Circle_Class)
    } else {
        board.classList.add(Cross_Class)
    }
}

function checkWin(currentClass) {
    return winning_combination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}