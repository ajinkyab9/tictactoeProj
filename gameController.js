import gameBoard from "./gameBoard.js";
import { createPlayer } from "./player.js";

const gameController = (function () {
    let isGameOver = true;
    let players = [];
    let activePlayer;
    const variableNavTitle = document.querySelector("#navTitle");

    const startGame = (p1Name, p1Marker, p2Name, p2Marker) => {
        players = [
            createPlayer(p1Name, p1Marker),
            createPlayer(p2Name, p2Marker)
        ];
        activePlayer = players[0];
        isGameOver = false;

        const displayP1Name = players[0].name;
        const displayP2Name = players[1].name;

        document.getElementById("p1Name").innerText = displayP1Name;
        document.getElementById("p2Name").innerText = displayP2Name;
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

    const checkWin = (index) => {
        const board = gameBoard.getBoard();

        const checkRowMarkerPos = Math.floor(index / 3);
        const checkColMarkerPos = index % 3;
        const rowStart = checkRowMarkerPos * 3;

        if (board[rowStart] !== "" && board[rowStart] === board[rowStart + 1] && board[rowStart + 1] === board[rowStart + 2]) {
            return true;
        } else if (board[checkColMarkerPos] !== "" && board[checkColMarkerPos] === board[checkColMarkerPos + 3] && board[checkColMarkerPos + 3] === board[checkColMarkerPos + 6]) {
            return true;
        } else if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) {
            return true;
        } else if (board[2] !== "" && board[2] === board[4] && board[4] === board[6]) {
            return true;
        }
        return false;
    }

    const playRound = (index) => {
        if (isGameOver) return;

        const currentPlayer = getActivePlayer();
        const validMove = gameBoard.dropMarker(index, currentPlayer.marker);

        if (validMove) {
            if (checkWin(index)) {
                currentPlayer.addScore();

                if (currentPlayer === players[0]) {
                    document.getElementById("p1Score").innerText = currentPlayer.getScore();
                } else {
                    document.getElementById("p2Score").innerText = currentPlayer.getScore()
                }

                console.log(`${currentPlayer.name} Wins!`);
                variableNavTitle.innerText = `${currentPlayer.name} Wins!`;

                let displayScore = document.querySelectorAll(".scoreLableHide");
                displayScore.forEach(newScore => {
                    newScore.classList.add("scoreLable");
                })

                const addWinAnimation = document.getElementById("navTitle");
                addWinAnimation.classList.add("winAni");
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
                variableNavTitle.innerText = "Draw!"
                console.log("It's a Draw!");
                console.log(gameBoard.getBoard());
                return;
            }

            switchPlayerTurn();
        }

        console.log(gameBoard.getBoard());
    };

    const playNextRound = () => {
        gameBoard.clearBoard();
        isGameOver = false;
        activePlayer = players[0];
    }

    return {
        startGame,
        switchPlayerTurn,
        getActivePlayer,
        playRound,
        playNextRound
    }
})();

export default gameController;