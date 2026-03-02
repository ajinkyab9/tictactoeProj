const gameBoard = (function() {
    const markerSlots = Array(9).fill("");

    const getBoard = () => markerSlots;

    return {
        getBoard
     };


})();

const createPlayer = (name, marker) => {
    return { name, marker };
}

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");