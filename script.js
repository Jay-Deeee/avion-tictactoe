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

const handleWin = (letter) => {
    gameIsLive = false;   
    statusDiv.textContent = `${letter} has won!`;
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

    // horizontal
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);
        gameBox[0].classList.add("won");
        gameBox[1].classList.add("won");
        gameBox[2].classList.add("won");
    } else if (middleLeft && middleLeft === middle && middleLeft === middleRight) {
        handleWin(middleLeft);
        gameBox[3].classList.add("won");
        gameBox[4].classList.add("won");
        gameBox[5].classList.add("won");
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        gameBox[6].classList.add("won");
        gameBox[7].classList.add("won");
        gameBox[8].classList.add("won");
    // vertical
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        gameBox[0].classList.add("won");
        gameBox[3].classList.add("won");
        gameBox[6].classList.add("won");
    } else if (topMiddle && topMiddle === middle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        gameBox[1].classList.add("won");
        gameBox[4].classList.add("won");
        gameBox[7].classList.add("won");
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        gameBox[2].classList.add("won");
        gameBox[5].classList.add("won");
        gameBox[8].classList.add("won");
    // diagonal
    } else if (topLeft && topLeft === middle && topLeft === bottomRight) {
        handleWin(topLeft);
        gameBox[0].classList.add("won");
        gameBox[4].classList.add("won");
        gameBox[8].classList.add("won");
    } else if (topRight && topRight === middle && topRight === bottomLeft) {
        handleWin(topRight);
        gameBox[2].classList.add("won");
        gameBox[4].classList.add("won");
        gameBox[6].classList.add("won");
    // tie
    } else if (topLeft && topMiddle && topRight && middleLeft && middle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.textContent = "It's a tie!";
    }

    if(gameIsLive === false && document.getElementById("replay-container").classList[0] === "hidden") {
        gameHistory();
    }
}

function reset() {
    gameIsLive = true;
    playerTurn1 = true;
    statusDiv.textContent = "X is first";

    for (let gameBoxes of gameBox) {
        gameBoxes.classList.remove("X", "O", "won");
    }

    if(document.getElementById("replay-container").classList[0] !== "hidden") {
        gameHistory();
    }
}

document.querySelector(".reset").addEventListener('click', reset);

function gameHistory() {
    let replayContainer = document.getElementById("replay-container");
    replayContainer.classList.toggle("hidden");
}