//Game Board IIFE below
const gameBoard = (function() {
    const markerSlots = Array(9).fill("");

    const getBoard = () => markerSlots;
    const dropMarker = (index, marker) => {
        if (markerSlots[index] === "") {
            markerSlots[index] = marker;
        } else {
            console.log("Spot taken. Please choose another one.")
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
    createPlayer("Player Two", "Y")
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

    return {
        switchPlayerTurn,
        getActivePlayer
    }

})();