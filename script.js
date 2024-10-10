const Gameboard = () => {
	let board = ['', '', '', '', '', '', '', '', ''];
	let cellElements = '';

	const getBoard = () => {
		cellElements = '';
		board.forEach((_cell, index) => {
			cellElements += `<button class='cell' id=${index}></button>`;
		});
	};

	const getCellElements = () => cellElements;

	return {
		getBoard,
		getCellElements,
	};
};

//GAME CONTROLLER MODULE

const GameController = () => {
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
	let currentPlayerMark;
	let messageText = '';

	const cells = document.getElementsByClassName('cell');
	const messageElement = document.querySelector('.message');
	//factory fn
	const createPlayer = (name, mark) => {
		return {
			name,
			mark,
		};
	};

	const playNewRound = () => {
		createPlayers();
		activePlayerIndex = 0;
		messageText = `${players[activePlayerIndex].name}'s turn`;
		listenToCellClicks();
		printGameMessage();
	};

	const createPlayers = () => {
		const playerOne =
			document.querySelector('#player-1').value || classCross;
		const playerTwo =
			document.querySelector('#player-2').value || classCircle;
		players = [
			createPlayer(playerOne, classCross),
			createPlayer(playerTwo, classCircle),
		];
		console.log(players);
	};

	const listenToCellClicks = () => {
		[...cells].forEach((cell) => {
			cell.addEventListener('click', clickHandlerBoard, {
				once: true,
			});
		});
	};

	//main logic
	const clickHandlerBoard = (event) => {
		//get id
		let id = parseInt(event.target.id);
		console.log(id);

		//place mark
		currentPlayerMark = players[activePlayerIndex].mark;
		placeMark(id, currentPlayerMark);

		//winner
		if (checkWin(currentPlayerMark)) {
			messageText = `${players[
				activePlayerIndex
			].name.toUpperCase()} is the WINNER!`;
			stopListeningToClicks();

			//draw
		} else if (checkDraw()) {
			messageText = 'DRAW!';
			stopListeningToClicks();

			//continue playing
		} else {
			changeTurn();
			messageText = `${players[activePlayerIndex].name}'s turn`;
		}
		//message
		printGameMessage();
	};

	const placeMark = (index, mark) => {
		const cell = document.getElementById(index);
		cell.classList.add(mark);
	};

	const checkWin = (mark) => {
		return winningCombinations.some((combination) => {
			return combination.every((index) => {
				return [...cells][index].classList.contains(mark);
			});
		});
	};

	const checkDraw = () => {
		return [...cells].every((cell) => {
			return (
				cell.classList.contains(classCross) ||
				cell.classList.contains(classCircle)
			);
		});
	};

	const changeTurn = () => {
		activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
	};

	const printGameMessage = () => {
		messageElement.textContent = messageText;
	};

	const stopListeningToClicks = () => {
		[...cells].forEach((cell) => {
			cell.removeEventListener('click', clickHandlerBoard);
		});
	};

	return { playNewRound };
};

//SCREEN CONTROLLER MODULE

const ScreenController = (() => {
	const boardHTML = document.querySelector('.board');
	const startBtn = document.querySelector('.start-game-btn');
	const restartBtn = document.querySelector('.restart-btn');
	const messageElement = document.querySelector('.message');
	const inputContainer = document.querySelector('.players');
	const playerOneField = document.querySelector('#player-1');
	const playerTwoField = document.querySelector('#player-2');

	const board = Gameboard();
	const game = GameController();

	const printNewRound = () => {
		hideStartFields();
		//render board
		printBoard();
		game.playNewRound();
	};

	const printBoard = () => {
		board.getBoard();
		boardHTML.innerHTML = board.getCellElements();
	};

	const hideStartFields = () => {
		startBtn.style.display = 'none';
		inputContainer.style.display = 'none';
	};

	const printNewGame = () => {
		boardHTML.innerHTML = '';
		messageElement.textContent = '';
		playerOneField.value = '';
		playerTwoField.value = '';
		startBtn.style.display = 'inline-block';
		inputContainer.style.display = 'block';
	};

	startBtn.addEventListener('click', printNewRound);
	restartBtn.addEventListener('click', printNewGame);
})();
