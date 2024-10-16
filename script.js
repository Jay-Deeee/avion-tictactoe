let board = document.getElementById("board");

let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let playerTurn1 = true;

function createBoard(){
    for (let i = 0; i < 9; i++) {
        let gameGrid = document.createElement("div");
        gameGrid.classList.add("gameBox");
        let gridId = `box${i}`;
        gameGrid.setAttribute("id", gridId);
        board.appendChild(gameGrid);
        gameGrid.addEventListener("click", () => {
            checkGameStatus();
            if (gameIsLive === true) {
                addMove(gridId, i);
            }
        });
    }
}

function addMove(element, boxNumber){
    let specificGrid = document.getElementById(element);
    if(specificGrid.classList.contains("x") || specificGrid.classList.contains("o")) {
        return;
    }

    if(playerTurn1) {
        specificGrid.classList.add("X");
        statusDiv.textContent = "O is next";
        checkGameStatus();
        playerTurn1 = !playerTurn1;
    } else {
        specificGrid.classList.add("O");
        statusDiv.textContent = "X is next";
        checkGameStatus();
        playerTurn1 = !playerTurn1;
    }
    updateBoard(specificGrid, boxNumber);
}

function updateBoard(element, boxNumber){
    let row = Math.floor(boxNumber/3);
    let column = boxNumber % 3;
    gameBoard[row][column] = element.innerText;
}

createBoard();

const statusDiv = document.querySelector(".status");
const gameBox = document.querySelectorAll(".gameBox");
let gameIsLive = true;
let winner = null;

const handleWin = (letter) => {
    gameIsLive = false;
    winner = letter;    
    statusDiv.textContent = `${winner} has won!`;
}

const checkGameStatus = () => {
    const topLeft = gameBox[0].classList[1];
    const topMiddle = gameBox[1].classList[1];
    const topRight = gameBox[2].classList[1];
    const middleLeft = gameBox[3].classList[1];
    const middle = gameBox[4].classList[1];
    const middleRight = gameBox[5].classList[1];
    const bottomLeft = gameBox[6].classList[1];
    const bottomMiddle = gameBox[7].classList[1];
    const bottomRight = gameBox[8].classList[1];

    // vertical
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);
    } else if (middleLeft && middleLeft === middle && middleLeft === middleRight) {
        handleWin(middleLeft);
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
    // horizontal
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
    } else if (topMiddle && topMiddle === middle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
    // diagonal
    } else if (topLeft && topLeft === middle && topLeft === bottomRight) {
        handleWin(topLeft);
    } else if (topRight && topRight === middle && topRight === bottomLeft) {
        handleWin(topRight);
    // tie
    } else if (topLeft && topMiddle && topRight && middleLeft && middle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.textContent = "It's a tie!";
    }
};

function reset() {
    let gridBox = document.querySelectorAll(".gameBox");
    for (i = 0; i < gridBox.length; i++) {
        console.log(gridBox[i]);
        gridBox[i].classList.remove("X", "O");
    }
    gameIsLive = true;
    winner = null;
    playerTurn1 = true;
    statusDiv.textContent = "X is first";
}

document.querySelector(".reset").addEventListener('click', reset);