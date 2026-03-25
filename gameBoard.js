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

    const clearBoard = () => {
        //empties the original array so that players can play again
        markerSlots.fill("");
    }

    return {
        getBoard,
        dropMarker,
        clearBoard
    };

})();

export default gameBoard;