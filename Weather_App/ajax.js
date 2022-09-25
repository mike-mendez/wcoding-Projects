const callAPI = (cityName) => {
	const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=2aeea964dad071b53c1b9275bcbc975e&units=metric`;
	let xhr = new XMLHttpRequest();
	xhr.open("GET", apiURL);
	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            clear();
            formatWeather(JSON.parse(xhr.responseText));
		} else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
            clear();

            document.getElementById('current-day-container').innerHTML = `<h1>Could not complete request</h1><h1>${xhr.status}</h1><h1>${xhr.statusText}</h1>`;
            document.getElementById('current-day-container').style.visibility = 'visible';
		}
	});
	xhr.send(null);
};