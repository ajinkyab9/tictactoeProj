//Game Board IIFE below
const gameBoard = (function() {
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

    const players = [
    createPlayer("Player One", "X"),
    createPlayer("Player Two", "O")
    ];

    let activePlayer = players[0];

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

         if(board[rowStart] !== "" && board[rowStart] === board[rowStart + 1] && board[rowStart + 1] === board[rowStart + 2]){
            return true;
         } 
         return false;
        }
    //check win

    const playRound = (index) => {
        const currentPlayer = getActivePlayer();
        const validMove = gameBoard.dropMarker(index, currentPlayer.marker);

        if (validMove) {
            if(checkWin(index)) {
                console.log(`${currentPlayer.name} Wins!`);
                console.log(gameBoard.getBoard());
            }
                    switchPlayerTurn();
        }


        console.log(gameBoard.getBoard());
    };

    return {
        switchPlayerTurn,
        getActivePlayer,
        playRound
    }

})();