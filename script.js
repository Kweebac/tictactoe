const gameBoard = (function () {
  const gameBoard = ["X", "O", "X", "O", "O", "X", "O", "X", "O"];

  return { gameBoard };
})();

const displayControl = (function () {
  const gridSquares = document.querySelectorAll(".grid > div");
  const player1UIMarker = document.querySelector(
    ".player:first-child > div:last-child"
  );
  const player2UIMarker = document.querySelector(
    ".player:last-child > div:last-child"
  );
  const player1UIName = document.querySelector(
    ".player:first-child > div:first-child"
  );
  const player2UIName = document.querySelector(
    ".player:last-child > div:first-child"
  );

  const setMarkers = function () {
    for (let i = 0; i < gridSquares.length; i++) {
      gridSquares[i].textContent = gameBoard.gameBoard[i];
    }
  };

  const playerUI = function () {
    player1UIMarker.textContent = player1.marker;
    player2UIMarker.textContent = player2.marker;
    player1UIName.textContent = player1.name;
    player2UIName.textContent = player2.name;
  };

  return { setMarkers, playerUI };
})();

const playerFactory = function (name, marker) {
  return { name, marker };
};

const player1 = playerFactory("Kweebac", "X");
const player2 = playerFactory("A1yssa", "O");
displayControl.playerUI();
displayControl.setMarkers();
