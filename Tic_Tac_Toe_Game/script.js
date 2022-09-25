let x = document.createElement("h1");
x.className = "x";
x.textContent = "X";
let o = document.createElement("h1");
o.className = "o";
o.textContent = "O";

let gameBoard = document.getElementById("tictactoe-board");
let moveHistory = document.getElementById("moveHistory");

for (i = 1; i < 10; i++) {
	let box = document.createElement("div");
	box.classList.add("board-space");
	box.id = i;
	gameBoard.appendChild(box);
}

let playerX = true;
let playerO = false;

let moveCount = 0;

const gameplay = (e) => {
	if (playerX && e.target.textContent == "") {
		e.target.appendChild(x.cloneNode(true));
		let move = document.createElement("p");
		move.textContent = `playerX to square ${e.target.id}`;
		moveHistory.appendChild(move);
		moveCount++;
		setTimeout(() => {
			gameWinner(e.target);
		}, 100);
		playerX = false;
		playerO = true;
	} else {
		if (e.target.textContent == "") {
			e.target.appendChild(o.cloneNode(true));
			let move = document.createElement("p");
			move.textContent = `playerO to square ${e.target.id}`;
			moveHistory.appendChild(move);
			moveCount++;
			setTimeout(() => {
				gameWinner(e.target);
			}, 100);
			playerO = false;
			playerX = true;
		}
	}
};

for (box of gameBoard.childNodes) {
	box.addEventListener("click", gameplay);
}

const gameWinner = (box) => {
	let playerWins = false;
	let winPossibilities = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];
	for (let i = 0; i < winPossibilities.length; i++) {
		let square1 = document.getElementById(winPossibilities[i][0]);
		let square2 = document.getElementById(winPossibilities[i][1]);
		let square3 = document.getElementById(winPossibilities[i][2]);
		if (
			square1.textContent.toLowerCase() === "x" &&
			square2.textContent.toLowerCase() === "x" &&
			square3.textContent.toLowerCase() === "x"
		) {
			square1.firstElementChild.classList.add("winningText");
			square2.firstElementChild.classList.add("winningText");
			square3.firstElementChild.classList.add("winningText");
			square1.classList.add("winningBox");
			square2.classList.add("winningBox");
			square3.classList.add("winningBox");
			let winner = document.createElement("h1");
			winner.id = "winner";
			winner.textContent = `X WINS!!!`;
			gameBoard.appendChild(winner);
			for (box of gameBoard.childNodes) {
				box.removeEventListener("click", gameplay);
			}
			playerWins = true;
            reset();
		} else if (
			square1.textContent.toLowerCase() === "o" &&
			square2.textContent.toLowerCase() === "o" &&
			square3.textContent.toLowerCase() === "o"
		) {
			square1.firstElementChild.classList.add("winningText");
			square2.firstElementChild.classList.add("winningText");
			square3.firstElementChild.classList.add("winningText");
			square1.classList.add("winningBox");
			square2.classList.add("winningBox");
			square3.classList.add("winningBox");
			console.log("O wins!");
			let winner = document.createElement("h1");
			winner.id = "winner";
			winner.textContent = `O WINS!!!`;
			gameBoard.appendChild(winner);
			for (box of gameBoard.childNodes) {
				box.removeEventListener("click", gameplay);
			}
			playerWins = true;
            reset();
		}
	}
	if (moveCount == 9 && playerWins == false) {
		console.log(`It's a DRAW!`);
        reset();
	}
};

const reset = () => {
	let resetButton = document.createElement("button");
	resetButton.textContent = `Reset Game`;
	resetButton.type = "button";
	document.body.appendChild(resetButton);
	resetButton.addEventListener("click", () => {
		for (box of gameBoard.querySelectorAll('div')) {
            box.textContent = '';
            box.classList.remove('winningBox');
			box.addEventListener("click", gameplay);
		}
        moveCount = 0;
        moveHistory.innerHTML = '';
        resetButton.remove();
	});
};
