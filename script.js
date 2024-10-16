let board = document.getElementById("board");

let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let playerTurn1 = true;

function createBoard(){
    for (let i = 0; i < 9; i++) {
        let gameGrid = document.createElement("div");
        gameGrid.classList.add("gameBox");
        let gridId = `box${i}`;
        gameGrid.setAttribute("id", gridId);
        board.appendChild(gameGrid);
        gameGrid.addEventListener("click", () => {
            addMove(gridId, i);
        })
    }
}

function addMove(element, boxNumber){
    let specificGrid = document.getElementById(element);
    if(!specificGrid.textContent) {
        if(playerTurn1) {
            specificGrid.textContent = "X";
            playerTurn1 = false;
        } else {
            specificGrid.textContent = "O";
            playerTurn1 = true;
        }
    }
    updateBoard(specificGrid, boxNumber);
}

function updateBoard(element, boxNumber){
    let row = Math.floor(boxNumber/3);
    let column = boxNumber % 3;
    gameBoard[row][column] = element.innerText;
    console.log(gameBoard);
}

createBoard();

const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");