import gameBoard from "./gameBoard.js";
import gameController from "./gameController.js";

//Game Board IIFE below
const resetBoard = document.getElementsByClassName("resetBtn");
for (let i = 0; i < resetBoard.length; i++) {
  resetBoard[i].addEventListener("click", function () {
    window.location.reload();
  });
}

let variableNavTitle = document.querySelector("#navTitle");
variableNavTitle.innerText = "TIC TAC TOE";

const playButton = document.querySelector(".playBtn");
playButton.addEventListener("click", function () {
  const playerOne = document.querySelector(".playerOne").value;
  const markerOne = document.querySelector(".markerOne").value;
  const playerTwo = document.querySelector(".playerTwo").value;
  const markerTwo = document.querySelector(".markerTwo").value;

  if (
    playerOne === "" ||
    markerOne === "" ||
    playerTwo === "" ||
    markerTwo === ""
  ) {
    alert("Please enter player details before playing!");
    return;
  }

  let enablePlayBtn = document.querySelector(".playBtn");
  enablePlayBtn.classList.remove("showPlayBtn");
  enablePlayBtn.classList.add("hidePlayBtn");

  let enableBoard = document.querySelector(".mainGameGrid");
  enableBoard.classList.remove("hiddenBoard");
  enableBoard.classList.add("showBoard");

  let enablePlayAgain = document.querySelector(".playAgainBtn");
  enablePlayAgain.classList.remove("hidePlayAgain");
  enablePlayAgain.classList.add("showPlayAgain");

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

  gameController.startGame(playerOne, markerOne, playerTwo, markerTwo);
});

//Game Controller IIFE below

//Control the game grid
const screenController = (function () {
  const playAgainBtn = document.querySelector(".playAgainBtn");

  const markerCells = document.querySelectorAll(".cell");

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
  markerCells.forEach((cell) => {
    cell.addEventListener("click", clickHandlerBoard);
  });
  updateMarkerCells();

  playAgainBtn.addEventListener("click", () => {
    gameController.playNextRound();

    variableNavTitle.innerText = "TIC TAC TOE";

    const addWinAnimation = document.getElementById("navTitle");
    addWinAnimation.classList.remove("winAni");

    markerCells.forEach((cell) => {
      cell.textContent = "";
    });

    markerCells.forEach((cell) => {
      cell.classList.remove("disable");
    });
  });

  updateMarkerCells();

  markerCells.forEach((cell) => {
    cell.classList.remove("disable");
  });
})();
