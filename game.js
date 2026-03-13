//Game Board IIFE below
const resetBoard = document.getElementsByClassName("resetBtn");
for (let i = 0; i < resetBoard.length; i++) {
    resetBoard[i].addEventListener("click", function () {
        window.location.reload();
    });
}

const playButton = document.querySelector(".playBtn");
playButton.addEventListener("click", function () {
    const playerOne = document.querySelector(".playerOne").value;
    const markerOne = document.querySelector(".markerOne").value;
    const playerTwo = document.querySelector(".playerTwo").value;
    const markerTwo = document.querySelector(".markerTwo").value;

    if (playerOne === "" || markerOne === "" || playerTwo === "" || markerTwo === "") {
        alert("Please enter player details before playing!");
        return;
    }
    let enableBoard = document.querySelector(".mainGameGrid");
    enableBoard.classList.remove("hiddenBoard");
    enableBoard.classList.add("showBoard");

    let disableDetailCard = document.querySelectorAll(".inputGroup");

    disableDetailCard.forEach((card) => {
        card.classList.remove("showDetailInput");
        card.classList.add("hideDetailInput");
    });

    let enableScoreCard = document.querySelectorAll(".scoreCardCmm");

    enableScoreCard.forEach((scoreCard) => {
        scoreCard.classList.remove("hiddenScoreCard");
        scoreCard.classList.add("showScoreCard");
    });





    gameController.startGame(playerOne, markerOne, playerTwo, markerTwo)
});

const gameBoard = (function () {
    const markerSlots = Array(9).fill("");

    const getBoard = () => markerSlots;

    const dropMarker = (index, marker) => {
        if (markerSlots[index] === "") {
            markerSlots[index] = marker;
            return true;
        } else {
            console.log("Spot taken. Please choose another one.")
            return false;
        }
    };

    return {
        getBoard,
        dropMarker
    };


})();
//IIFE End

const createPlayer = (name, marker) => {
    return { name, marker };
}

//Game Controller IIFE below
const gameController = (function () {

    let isGameOver = true;
    let players = [];
    let activePlayer;

    const startGame = (p1Name, p1Marker, p2Name, p2Marker) => {

        players = [
            createPlayer(p1Name, p1Marker),
            createPlayer(p2Name, p2Marker)
        ];
        activePlayer = players[0];
        isGameOver = false;
        console.log(`Game Started! ${activePlayer.name}'s turn.`);
    }


    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    }

    const getActivePlayer = () => activePlayer;

    //check win
    const checkWin = (index) => {
        const board = gameBoard.getBoard();

        const checkRowMarkerPos = Math.floor(index / 3);//for getting a round off down to the nearest integer
        const checkColMarkerPos = index % 3;//for getting a round off down to the nearest integer
        //Check the row
        const rowStart = checkRowMarkerPos * 3;

        if (board[rowStart] !== "" &&
            board[rowStart] === board[rowStart + 1] &&
            board[rowStart + 1] === board[rowStart + 2]) {
            return true;
        } else if (board[checkColMarkerPos] !== "" &&
            board[checkColMarkerPos] === board[checkColMarkerPos + 3] &&
            board[checkColMarkerPos + 3] === board[checkColMarkerPos + 6]) {
            return true;
        } else if (board[0] !== "" &&
            board[0] === board[4] &&
            board[4] === board[8]) {
            return true;
        } else if (board[2] !== "" &&
            board[2] === board[4] &&
            board[4] === board[6]) {
            return true;
        }
        return false;
    }

    //check the column

    //check win

    const playRound = (index) => {

        if (isGameOver) return;

        const currentPlayer = getActivePlayer();
        const validMove = gameBoard.dropMarker(index, currentPlayer.marker);

        if (validMove) {
            if (checkWin(index)) {
                console.log(`${currentPlayer.name} Wins!`);
                console.log(gameBoard.getBoard());

                const disableCell = document.querySelectorAll(".cell");
                disableCell.forEach(cell => {
                    cell.classList.add("disable");
                });
                isGameOver = true;
                return
            }

            const currentBoard = gameBoard.getBoard();
            if (!currentBoard.includes("")) {
                console.log("It's a Draw!");
                console.log(gameBoard.getBoard());
                return;
            }

            switchPlayerTurn();
        }


        console.log(gameBoard.getBoard());
    };

    return {
        startGame,
        switchPlayerTurn,
        getActivePlayer,
        playRound
    }
})();

//Control the game grid
const screenController = (function () {
    const markerCells = document.querySelectorAll('.cell');

    const updateMarkerCells = () => {
        const board = gameBoard.getBoard();

        markerCells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const clickHandlerBoard = (e) => {
        const selectedIndex = e.target.dataset.index;

        if (!selectedIndex) return;

        gameController.playRound(selectedIndex);
        updateMarkerCells();


    };
    markerCells.forEach(cell => {
        cell.addEventListener("click", clickHandlerBoard);
    });
    updateMarkerCells();
})();
