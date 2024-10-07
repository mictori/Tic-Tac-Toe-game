const Gameboard = (() => {
	const gameBoardElement = document.querySelector('.board');
	let gameBoard = ['', '', '', '', '', '', '', '', ''];
	let cellElements = '';

	const getBoard = () => {
		cellElements = '';
		gameBoard.forEach((_cell, index) => {
			cellElements += `<button class='cell' id=${index}></button>`;
		});
		gameBoardElement.innerHTML = cellElements;
	};

	const cells = document.getElementsByClassName('cell');
	const getCells = () => [...cells];

	return {
		getBoard,
		getCells,
	};
})();

//GAME CONTROLLER MODULE

const GameController = (() => {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const classCross = 'cross';
	const classCircle = 'circle';
	let players = [];
	let activePlayerIndex;
	const createPlayer = (name, mark) => {
		return {
			name,
			mark,
		};
	};

	const playNewRound = () => {
		messageText.textContent = '';

		players = [
			createPlayer(document.querySelector('#player-1').value, classCross),
			createPlayer(
				document.querySelector('#player-2').value,
				classCircle
			),
		];

		activePlayerIndex = 0;
		Gameboard.getBoard();
		printMessage();
		listenCellClicks();
	};

	const clickHandlerBoard = (event) => {
		let id = parseInt(event.target.id);
		const currentPlayerMark = players[activePlayerIndex].mark;
		placeMark(id, currentPlayerMark);
		if (checkWin(currentPlayerMark)) {
			gameOver(false);
			stopListeningClicks();
		} else if (checkDraw()) {
			gameOver(true);
			stopListeningClicks();
		} else {
			changeTurn();
			printMessage();
		}
	};

	const placeMark = (index, mark) => {
		const cell = document.getElementById(index);
		cell.classList.add(mark);
	};

	const checkWin = (mark) => {
		const cells = Gameboard.getCells();
		return winningCombinations.some((combination) => {
			return combination.every((index) => {
				return cells[index].classList.contains(mark);
			});
		});
	};

	const checkDraw = () => {
		const cells = Gameboard.getCells();
		return cells.every((cell) => {
			return (
				cell.classList.contains(classCross) ||
				cell.classList.contains(classCircle)
			);
		});
	};

	const changeTurn = () => {
		activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
	};

	const gameOver = (draw) => {
		if (draw) {
			messageText.textContent = 'Draw!';
			Gameboard.getBoard();
		} else {
			messageText.textContent = `${
				players[activePlayerIndex].name ||
				players[activePlayerIndex].mark
			} is the Winner!`;
		}
	};

	const listenCellClicks = () => {
		const cells = Gameboard.getCells();
		cells.forEach((cell) => {
			cell.addEventListener('click', GameController.clickHandlerBoard, {
				once: true,
			});
		});
	};

	const stopListeningClicks = () => {
		const cells = Gameboard.getCells();
		cells.forEach((cell) => {
			cell.removeEventListener('click', GameController.clickHandlerBoard);
		});
	};

	const messageText = document.querySelector('.message');

	const printMessage = () => {
		messageText.textContent = `${
			players[activePlayerIndex].name || players[activePlayerIndex].mark
		}'s turn`;
	};

	return {
		playNewRound,
		clickHandlerBoard,
	};
})();

//SCREEN CONTROLLER MODULE

const ScreenController = (() => {
	const startBtn = document.querySelector('.start-game-btn');
	const restartBtn = document.querySelector('.restart-btn');

	const printNewRound = () => {
		GameController.playNewRound();
	};

	startBtn.addEventListener('click', printNewRound);

	restartBtn.addEventListener('click', printNewRound);
})();

//print restart, message
//hide inputs, start btn
