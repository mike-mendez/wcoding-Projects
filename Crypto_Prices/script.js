let table = document.querySelector("tbody");

const getCrypto = () => {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.coinlore.net/api/tickers/");

	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			let cryptoData = JSON.parse(xhr.responseText);
			table.innerHTML = "";
			// formatCrypto(cryptoData);
			// Do all formatting in function formatCrypto
			for (coin of cryptoData.data) {
				let tr = document.createElement("tr");
				formatCrypto(coin, tr);
				table.appendChild(tr);
			}
		} else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
			alert(
				`Could not complete request\nCode: ${xhr.status}\n${xhr.statusText}`
			);
		}
	});
	xhr.send(null);
};

const formatCrypto = (coinData, row) => {
	let rank = document.createElement("td");
	rank.textContent = coinData["rank"];

	let name = document.createElement("td");
	name.textContent = `${coinData["name"]} `;

	let priceUSD = document.createElement("td");
	priceUSD.textContent = `$${thousandsSeparator(parseFloat(coinData["price_usd"]))}`;

	let perChange1H = document.createElement("td");
	perChange1H.textContent = `${coinData["percent_change_1h"]}%`;
	perChange1H = changePercent(perChange1H);

	let perChange24H = document.createElement("td");
	perChange24H.textContent = `${coinData["percent_change_24h"]}%`;
	perChange24H = changePercent(perChange24H);

	let perChange7D = document.createElement("td");
	perChange7D.textContent = `${coinData["percent_change_7d"]}%`;
	perChange7D = changePercent(perChange7D);

	let marketCap = document.createElement("td");
	marketCap.textContent = `$${thousandsSeparator(parseFloat(coinData["market_cap_usd"]).toFixed(0))}`;

	let volume24h = document.createElement("td");
	volume24h.textContent = `$${thousandsSeparator(parseFloat(coinData["volume24"]).toFixed(0))}`;

	let circulation = document.createElement("td");
	circulation.textContent = `${thousandsSeparator(parseFloat(coinData["csupply"]).toFixed(0))} `;
	console.log(typeof coinData['csupply'],coinData["csupply"]);

	let symbol = document.createElement("span");
	symbol.textContent = coinData["symbol"];
	name.appendChild(symbol);
	circulation.appendChild(symbol);

	row.appendChild(rank);
	row.appendChild(name);
	row.appendChild(priceUSD);
	row.appendChild(perChange1H);
	row.appendChild(perChange24H);
	row.appendChild(perChange7D);
	row.appendChild(marketCap);
	row.appendChild(volume24h);
	row.appendChild(circulation);
};

const changePercent = (percent) => {
	// Use ternary when it's only 2 options
	if (parseFloat(percent.textContent) > 0) {
		percent.textContent = `▲${percent.textContent}`;
		percent.classList.add("positive");
		return percent;
	} else if (parseFloat(percent.textContent) < 0) {
		percent.textContent = `▼${percent.textContent}`;
		percent.classList.add("negative");
		return percent;
	}
	return percent;
};

const thousandsSeparator = (num) => {
	let numParts = num.toString().split(".");
	numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return numParts.join(".");
};

getCrypto();

setInterval(() => {
	getCrypto();
}, 30000);

// Separate AJAX in a different file
//
