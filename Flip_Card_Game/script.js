let cardGenerator = document.getElementById("cardGenerator");
let input = document.getElementById("numberOfCards");
let cardContainer = document.getElementById("cardContainer");

let tries = 0;

const generateCards = () => {
	cardContainer.innerHTML = "";
	// NO FLIP
	// let userInput = input.value;
	// for (let i = 0; i < userInput; i++) {
	// 	let card = document.createElement("div");
	// 	card.classList.add("cards");
	//     cardContainer.appendChild(card);
	//     card.addEventListener('click', gameplay);
	// }
	// randomGenerator();

	// FLIP
	let userInput = input.value;
	for (i = 0; i < userInput; i++) {
		let card = document.createElement("div");
		let cardInner = document.createElement("div");
		let cardFront = document.createElement("div");
		let cardBack = document.createElement("div");
		card.classList.add("cards");
		card.classList.add("flip-card");
		cardInner.classList.add("flip-card-inner");
		cardFront.classList.add("flip-card-front");
		cardBack.classList.add("flip-card-back");
		card.appendChild(cardInner);
		cardInner.appendChild(cardFront);
		cardInner.appendChild(cardBack);
		cardContainer.appendChild(card);
		card.addEventListener("click", gameplay);
	}
	randomGenerator();
};

cardGenerator.addEventListener("click", generateCards);

const randomGenerator = () => {
	// NO FLIP
	// let cards = document.querySelectorAll(".cards"); // NO FLIP
	// let random = Math.floor(Math.random() * cards.length + 1);
	// for (k of cards.keys()) {
    //     k + 1 == random ? (cards[k].innerHTML = "<p>O</p>") : (cards[k].innerHTML = "<p>X</p>");
	// }

	// FLIP
	let cards = document.querySelectorAll(".flip-card-back");
	let random = Math.floor(Math.random() * cards.length + 1);
	for (k of cards.keys()) {
		k + 1 == random ? (cards[k].innerHTML = "<p>O</p>") : (cards[k].innerHTML = "<p>X</p>");
	}
};

const gameplay = (e) => {
	// NO FLIP
	// if (e.target.className == 'cards') {
	//     tries++;
	//     e.target.setAttribute('style', 'background-color: gray');
	//     if (e.target.textContent == 'O') {
	//         for (card of cardContainer.childNodes) {
	//             card.setAttribute('style', 'background-color: gray');
	// 			card.removeEventListener("click", gameplay);
	// 		}
	//         console.log(`You found the O! It took you ${tries} tries.`)
	//     }
	// }

	// FLIP
	if (e.target.className == "flip-card-front") {
		tries++;
		e.target.parentElement.classList.add("clicked");
		if (e.target.nextSibling.textContent == "O") {
			for (card of cardContainer.childNodes) {
				card.firstElementChild.classList.add("clicked");
				card.removeEventListener("click", gameplay);
			}
			console.log(`You found the O! It took you ${tries} tries.`);
			tries = 0;
		}
	}
};

// const reset = () => {

// };
