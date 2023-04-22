const gameBoard = (function () {
  let _gameBoard = [];
  let _currentPlayer;

  const getGameBoard = function () {
    return _gameBoard;
  };
  const addToGameBoard = function (marker, index) {
    _gameBoard[index] = marker;
  };
  const resetGameBoard = function () {
    _gameBoard = [];
  };

  const getCurrentPlayer = function () {
    return _currentPlayer;
  };
  const setCurrentPlayer = function (player) {
    _currentPlayer = player;
  };
  const switchPlayer = function () {
    _currentPlayer !== player1
      ? (_currentPlayer = player1)
      : (_currentPlayer = player2);
  };

  return {
    getGameBoard,
    addToGameBoard,
    getCurrentPlayer,
    setCurrentPlayer,
    switchPlayer,
    resetGameBoard,
  };
})();

const displayControl = (function () {
  const _gridSquares = document.querySelectorAll(".grid > div");
  const _player1UIMarker = document.querySelector(
    ".player:first-child > div:last-child"
  );
  const _player2UIMarker = document.querySelector(
    ".player:last-child > div:last-child"
  );
  const _player1UIName = document.querySelector(
    ".player:first-child > div:first-child"
  );
  const _player2UIName = document.querySelector(
    ".player:last-child > div:first-child"
  );
  const _resetButton = document.querySelector("button");
  const _result = document.querySelector(".result");

  const setMarkers = function () {
    for (let i = 0; i < _gridSquares.length; i++) {
      _gridSquares[i].textContent = gameBoard.getGameBoard()[i];
    }
  };

  const playerUI = function () {
    _player1UIMarker.textContent = player1.marker;
    _player2UIMarker.textContent = player2.marker;
    _player1UIName.textContent = player1.name;
    _player2UIName.textContent = player2.name;
  };

  const _isThreeInARow = function (a, b, c) {
    return (
      gameBoard.getGameBoard()[a] === gameBoard.getCurrentPlayer().marker &&
      gameBoard.getGameBoard()[b] === gameBoard.getCurrentPlayer().marker &&
      gameBoard.getGameBoard()[c] === gameBoard.getCurrentPlayer().marker
    );
  };

  const _isGameOver = function () {
    if (
      _isThreeInARow(0, 1, 2) ||
      _isThreeInARow(3, 4, 5) ||
      _isThreeInARow(6, 7, 8) ||
      _isThreeInARow(0, 3, 6) ||
      _isThreeInARow(1, 4, 7) ||
      _isThreeInARow(2, 5, 8) ||
      _isThreeInARow(0, 4, 8) ||
      _isThreeInARow(2, 4, 6)
    ) {
      for (let i = 0; i < 9; i++) {
        if (
          gameBoard.getGameBoard()[i] !== "X" &&
          gameBoard.getGameBoard()[i] !== "O"
        ) {
          gameBoard.addToGameBoard(" ", i);
        }
      }
      setMarkers();
      _result.style.visibility = "visible";
      _result.textContent = `${gameBoard.getCurrentPlayer().name} wins!`;
      return true;
    } else if (gameBoard.getGameBoard().join("").length === 9) {
      _result.style.visibility = "visible";
      _result.textContent = "It's a tie!";
      return true;
    }
  };

  for (let i = 0; i < _gridSquares.length; i++) {
    _gridSquares[i].addEventListener("click", () => {
      if (_gridSquares[i].textContent === "") {
        gameBoard.addToGameBoard(gameBoard.getCurrentPlayer().marker, i);
        setMarkers();

        if (!_isGameOver()) {
          gameBoard.switchPlayer();
        }
      }
    });
  }

  _resetButton.addEventListener("click", () => {
    gameBoard.resetGameBoard();
    setMarkers();
    _result.style.visibility = "hidden";
  });

  return { setMarkers, playerUI };
})();

const playerFactory = function (name, marker) {
  return { name, marker };
};

const player1 = playerFactory(
  prompt("Player 1's username") || "Player 1",
  "X"
);
const player2 = playerFactory(
  prompt("Player 2's username") || "Player 2",
  "O"
);

displayControl.playerUI();
gameBoard.setCurrentPlayer(player1);
