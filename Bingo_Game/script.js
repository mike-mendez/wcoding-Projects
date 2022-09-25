const tds = document.querySelectorAll("td");
let wins = document.getElementById('wins');

const winners = [
	//Horizontal Winners
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, "free", 12, 13],
	[14, 15, 16, 17, 18],
	[19, 20, 21, 22, 23],
	//Vertical Winners
	[0, 5, 10, 14, 19],
	[1, 6, 11, 15, 20],
	[2, 7, "free", 16, 21],
	[3, 8, 12, 17, 22],
	[4, 9, 13, 18, 23],
	//Diagonal Winners
	[0, 6, "free", 17, 23],
	[4, 8, "free", 15, 19],
];
const checkBingo = () => {
    let numBingos = 0;
	for (i = 0; i < winners.length; i++) {
		let hasBingo = winners[i].every((box) => {
			return document
				.querySelector(`#square${box}`)
				.classList.contains("stamped");
		});
        if (hasBingo) {
            numBingos++;
            for (let j = 0; j < winners[i].length; j++) {
                console.log(document.querySelector(`#square${winners[i][j]}`));
                document.querySelector(`#square${winners[i][j]}`).classList.add("green");
            }
        }
	}
	// for (winner of winners) {
	//     console.log(winner);
	// 	return winner.every((box) => {
	// 		document.querySelector(`#square${box}`).classList.contains("stamped");
	// 	}) ? console.log('BINGO') : null;
	// }
    wins.textContent = `Number of wins: ${numBingos}`;
};

const removeBingos = () => {
    for (box of tds) {
        box.classList.remove('green');
    }
};

const stamp = (e) => {
	let sq = e.currentTarget;

	if (!sq.classList.contains("stamped")) {
		sq.classList.add("stamped");
		checkBingo();
	} else {
		sq.classList.remove("stamped");
        removeBingos();
		checkBingo();
	}
};

for (square of tds) {
	square.addEventListener("click", stamp);
}

let free = document.querySelector("#squarefree");
free.removeEventListener("click", stamp);
