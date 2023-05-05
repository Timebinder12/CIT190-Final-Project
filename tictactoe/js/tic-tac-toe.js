var player_X = 'x'
var player_O = 'circle'

var winning_combo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

var cell = document.querySelectorAll('[data-cell]')
var board = document.getElementById('board')
var winningMessageElement = document.getElementById('winningMessage')
var restartButton = document.getElementById('restartButton')
var winningMessageTextElement = document.getElementById('winningMessageText')
var isPlayer_O_Turn = false

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cell.forEach(cell => {
		cell.classList.remove(player_X)
		cell.classList.remove(player_O)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

//Handling the mouse click events for the cells on the board
function handleCellClick(e) {
	var cell = e.target
	var currentClass = isPlayer_O_Turn ? player_O : player_X
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} 
    else if (isDraw()) {
		endGame(true)
	} 
    else {
		swapTurns()
		setBoardHoverClass()
	}
}
//Function determines if the game is a draw and selects the appropriate winning text to the screen
function endGame(draw){
    if(draw){
        winningMessageElement.innerText = "The game is a draw! Press refresh to play again!";
    }
    else{
        winningMessageElement.innerText = 'Game Over! Press refresh to play again!';
    }
    winningMessageElement.classList.add('show');
}
//This function determines if the game is a draw. The output of this function goes into the endGame function
function isDraw() {
	return [...cell].every(cell => {
		return cell.classList.contains(player_X) || cell.classList.contains(player_O)
	})
}
//This function simply adds the mark (piece) to the board
function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

//This function swaps players turn which alternates the 'X' and 'O' pieces. 
function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

//Function to insert a character in the cells while hovering over them before placing it / makes it more interactive
function setBoardHoverClass() {
	board.classList.remove(player_X)
	board.classList.remove(player_O)
	if (isPlayer_O_Turn) {
		board.classList.add(player_O)
	} 
	else {
		board.classList.add(player_X)
	}
}

//Checks to see if there is a win using the winning_combo dictionary 
function checkWin(currentClass) {
	return winning_combo.some(combination => {
		return combination.every(index => {
			return cell[index].classList.contains(currentClass)
		})
	})
}

