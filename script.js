let board = document.getElementById("board");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let statusDiv = document.querySelector(".status");

let gameBoard = Array(9).fill(null);

let history = [];
let currentMoveIndex = 0;
let currentPlayer = 'X';
let gameIsLive = true;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        let gameGrid = document.createElement('div');
        gameGrid.classList.add('gameBox');
        gameGrid.id = `box${i}`;
        board.appendChild(gameGrid);
        gameGrid.addEventListener('click', () => {
            checkGameStatus();
            if (gameIsLive === true) {
            addMove(i)
            }
        });
    }
}

function addMove(index) {
    if (!gameBoard[index]) {
        gameBoard[index] = currentPlayer;
        history.push([...gameBoard]);
        currentMoveIndex = history.length - 1;
        updateBoard();
        togglePlayer();
        checkGameStatus();
        }
}

function updateBoard() {
    gameBoard.forEach((value, index) => {
        const box = document.getElementById(`box${index}`);
        box.classList.remove('X', 'O');
        if (value) {
            box.classList.add(value);
        }
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `${currentPlayer} is next`;
}

createBoard();

const handleWin = (letter) => {
    gameIsLive = false;
    statusDiv.textContent = `${letter} has won!`;
}

const gameBox = document.querySelectorAll(".gameBox");

const checkGameStatus = () => {
    if (!gameIsLive) return;

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
    statusDiv.textContent = "X is first";
    gameBoard.fill(null);
    history = [];
    currentMoveIndex = 0;
    currentPlayer = 'X';
    updateBoard();

    for (let gameBoxes of gameBox) {
        gameBoxes.classList.remove("X", "O", "won");
    }

    if(document.getElementById("replay-container").classList[0] !== "hidden") {
        gameHistory();
    }
}

function gameHistory() {
    let replayContainer = document.getElementById("replay-container");
    replayContainer.classList.toggle("hidden");
}

function prevHistory() {
    if (currentMoveIndex > 0) {
        currentMoveIndex--;
        gameBoard = [...history[currentMoveIndex]];
        updateBoard();
    }
}

function nextHistory() {
    if (currentMoveIndex < history.length - 1) {
        currentMoveIndex++;
        gameBoard = [...history[currentMoveIndex]];
        updateBoard();
    }
}

document.querySelector(".reset").addEventListener('click', reset);
prev.addEventListener("click", prevHistory);
next.addEventListener("click", nextHistory);