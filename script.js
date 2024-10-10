//GAME BOARD MODULE

const GameBoard = (() => {
	let board = ['', '', '', '', '', '', '', '', ''];
	let cellElements = '';

	const createCells = () => {
		cellElements = '';
		board.forEach((_cell, index) => {
			cellElements += `<button class='cell' id=${index}></button>`;
		});
	};

	const getCells = () => cellElements;

	return {
		createCells,
		getCells,
	};
})();

//GAME CONTROLLER MODULE

const GameController = (() => {
	const cells = document.getElementsByClassName('cell');
	const classCross = 'cross';
	const classCircle = 'circle';
	let players = [];
	let activePlayerIndex = 0;
	const createPlayer = (name, mark) => {
		return {
			name,
			mark,
		};
	};

	//GAME MAIN LOGIC
	const cellClickHandler = (event) => {
		//get id
		let id = parseInt(event.target.id);
		//place mark
		let activePlayerMark = players[activePlayerIndex].mark;
		placeMark(id, activePlayerMark);
		//if winner
		if (checkWin(activePlayerMark)) {
			ScreenController.displayWinner(
				getActivePlayerName(),
				activePlayerMark
			);
			ScreenController.disableCellListeners();
			//if draw
		} else if (checkDraw()) {
			ScreenController.displayWinner(false, activePlayerMark);
			ScreenController.disableCellListeners();
			//continue playing
		} else {
			changeTurn();
			ScreenController.printTurn(getActivePlayerName());
		}
	};

	const createNewPlayers = () => {
		const playerOne =
			document.querySelector('#player-1').value || classCross;
		const playerTwo =
			document.querySelector('#player-2').value || classCircle;
		players = [
			createPlayer(playerOne, classCross),
			createPlayer(playerTwo, classCircle),
		];
	};

	const changeTurn = () => {
		activePlayerIndex = activePlayerIndex === 0 ? 1 : 0;
	};

	const getActivePlayerName = () => players[activePlayerIndex].name;

	const placeMark = (index, mark) => {
		const cell = document.getElementById(index);
		cell.classList.add(mark);
	};

	const checkWin = (mark) => {
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

	return {
		getActivePlayerName,
		cellClickHandler,
		createNewPlayers,
	};
})();

//SCREEN CONTROLLER MODULE

const ScreenController = (() => {
	const startBtn = document.querySelector('.start-game-btn');
	const restartBtn = document.querySelector('.restart-btn');
	const cellElements = document.getElementsByClassName('cell');
	const inputContainer = document.querySelector('.players');
	const messageElement = document.querySelector('.message-element');
	const playerOneField = document.querySelector('#player-1');
	const playerTwoField = document.querySelector('#player-2');
	const boardElement = document.querySelector('.board');
	const board = GameBoard;
	const game = GameController;

	//GAME INIT
	const printRound = () => {
		hideStartingFields();
		game.createNewPlayers();
		printTurn(game.getActivePlayerName());
		printBoard();
		setUpCellListeners();
	};

	const printBoard = () => {
		board.createCells();
		boardElement.innerHTML = board.getCells();
	};

	const setUpCellListeners = () => {
		[...cellElements].forEach((cell) => {
			cell.addEventListener('click', game.cellClickHandler, {
				once: true,
			});
		});
	};

	const disableCellListeners = () => {
		[...cellElements].forEach((cell) => {
			cell.removeEventListener('click', game.cellClickHandler);
		});
	};

	const displayWinner = (name, mark) => {
		messageElement.textContent = '';
		if (name && mark === 'circle') {
			messageElement.innerHTML = `<span class="circle-color">${capitalizeName(
				name
			)}</span> is the winner!`;
		} else if (name && mark === 'cross') {
			messageElement.innerHTML = `<span>${capitalizeName(
				name
			)}</span> is the winner!`;
		} else {
			messageElement.textContent = `Draw!`;
		}
	};

	const printTurn = (name) => {
		messageElement.textContent = `${capitalizeName(name)}\'s turn`;
	};

	const capitalizeName = (name) => name[0].toUpperCase() + name.slice(1);

	const hideStartingFields = () => {
		startBtn.style.display = 'none';
		inputContainer.style.display = 'none';
	};

	const resetGame = () => {
		boardElement.innerHTML = '';
		messageElement.textContent = '';
		playerOneField.value = '';
		playerTwoField.value = '';
		startBtn.style.display = 'inline-block';
		inputContainer.style.display = 'block';
	};

	startBtn.addEventListener('click', printRound);
	restartBtn.addEventListener('click', resetGame);

	return {
		displayWinner,
		printTurn,
		disableCellListeners,
	};
})();
