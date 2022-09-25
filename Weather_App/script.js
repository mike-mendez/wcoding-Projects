/**
 * @param
 * 
 * @param {Object} [data] - data from API
 */

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

let parentDiv = document.getElementById('weather-container');
let currentDayDiv = document.getElementById("current-day-container");
let weatherData = document.querySelectorAll(".weather-data");
let input = document.querySelector("input");

/**
 * @param {String} e - searchbar input
 */

input.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		let inputCity = e.target.value;
		callAPI(inputCity);
		e.target.value = "";
	}
});

/**
 * @param {Object} [data] - data from API
 */

const formatWeather = (data) => {
	// console.log(data.list);
	let arr = [];
	for (i = 0; i < data.list.length; i += 8) {
		arr.push(data.list[i]);
	}

	// console.log(arr);

	for (weatherInfo of arr.keys()) {
		if (weatherInfo === 0) {
			let city = document.createElement("h1");
			city.textContent = `${data.city["name"]}`;
			weatherData[weatherInfo].appendChild(city);
		}

		let day = document.createElement("h2");
		day.textContent = `${days[new Date(arr[weatherInfo]["dt_txt"]).getDay()]}`;
		// console.log(new Date(arr[weatherInfo]["dt_txt"]));
		// console.log(new Date(arr[weatherInfo]["dt_txt"]).getDay());

		let img = document.createElement("img");
		img.src = `http://openweathermap.org/img/wn/${arr[weatherInfo].weather[0].icon}@2x.png`;
		img.alt = `${arr[weatherInfo].weather[0].description}`;

		let temp = document.createElement("p");
		temp.classList.add("temp");
		temp.textContent = `${arr[weatherInfo].main["temp"]}°C`;

		let weatherDes = document.createElement("p");
		weatherDes.textContent = `${arr[weatherInfo].weather[0].description}`;

		let table = document.createElement("table");
		table.innerHTML = `<tr><td>Wind: ${arr[weatherInfo].wind["speed"]} m/s</td><td>Pressure: ${arr[weatherInfo].main["pressure"]} hPa</td></tr><tr><td>Humidity: ${arr[weatherInfo].main["humidity"]}%</td><td>Cloudiness: ${arr[weatherInfo].clouds["all"]}%</td></tr>`;

		weatherData[weatherInfo].appendChild(day);
		weatherData[weatherInfo].appendChild(img);
		weatherData[weatherInfo].appendChild(temp);
		weatherData[weatherInfo].appendChild(weatherDes);

		if (weatherInfo === 0) weatherData[weatherInfo].appendChild(table);

		parentDiv.style.visibility = 'visible';
	}
};

// Clears previous content
const clear = () => {
	for (content of weatherData) {
		content.innerHTML = "";
	}
};