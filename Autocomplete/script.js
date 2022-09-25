let input = document.querySelector("input");
let results = document.getElementById("results-container");
let selectedIndex = -1;
const API_KEY =
	"1bh6WRi7hn47DAVqDT1PKYMvpah3DLcOi0OEofRQXxW7iwqyj6GP0hxVpPvRSbhq";

input.addEventListener("keyup", (e) => {
	if (e.key === "ArrowDown" || e.key === "ArrowUp") return;
	selectedIndex = -1;

	let xhr = new XMLHttpRequest();
	xhr.open("GET", `./search.php?s=${e.target.value}`);
	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			if (e.target.value == "") {
				results.innerHTML = "";
				results.style.visibility = "none";
			} else {
				results.innerHTML = xhr.responseText;
				results.style.visibility = "visible";
			}

			let cities = document.querySelectorAll("#results-container > div");
			for (city of cities) {
				city.addEventListener("click", (f) => {
					input.value = f.target.textContent;
					input.focus();
				});
			}
		} else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
			alert(
				`Could not complete request\nCode: ${xhr.status}\n${xhr.statusText}`
			);
		}
	});
	xhr.send(null);
});
console.log(selectedIndex);

input.addEventListener("keydown", (e) => {
	if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
		let cities = document.querySelectorAll("#results-container > div");
		if (e.key === "ArrowDown" && selectedIndex < cities.length - 1) {
			selectedIndex++;
		} else if (e.key === "ArrowUp" && selectedIndex > -1) {
			selectedIndex--;
		} else if (e.key === "Enter") {
			input.value = cities[selectedIndex].textContent;
			let test = input.value.split(" - ");
			let xhr = new XMLHttpRequest();
			xhr.open(
				"GET",
				`http://192.168.2.102/sites/Autocomplete/proxy.php?url=https://www.zipcodeapi.com/rest/${API_KEY}/city-zips.json/${test[0]}/${test[1]}`
			);
			xhr.addEventListener("readystatechange", () => {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					let zips = JSON.parse(xhr.responseText);
					results.innerHTML = "";
					for (zip of zips["zip_codes"]) {
						let zipContainer = document.createElement("div");
						zipContainer.textContent = zip;
						results.appendChild(zipContainer);
					}
				} else if (
					xhr.readyState === XMLHttpRequest.DONE &&
					xhr.status !== 200
				) {
					alert(
						`Could not complete request\nCode: ${xhr.status}\n${xhr.statusText}`
					);
				}
			});
			xhr.send(null);
		}
		cities.forEach((div, index) => {
			if (index === selectedIndex) div.classList.add("selected");
			else div.classList.remove("selected");
		});
	}
});
