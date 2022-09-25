let showMore = document.getElementById("show-more");
let refresh = document.querySelector("input[type='reset']");
let radios = document.querySelectorAll("input[type='radio']");
let showMessages;

for (radio of radios) {
	radio.addEventListener("change", (e) => {
		showMessages = e.target.value;
	});
}

refresh.addEventListener("click", () => {
	window.location = window.location.href.split("?")[0];
});

showMore.addEventListener("click", () => {
	let xhr = new XMLHttpRequest();

	for (radio of radios) {
        if (radio.checked == true && radio.value !== "all") {
            if (showMessages === undefined) showMessages = radio.value;
			xhr.open("GET", `./showMore.php?offset=${showMessages}&amount=${radio.value}`);
			test += radio.value;
		}
	}

	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            document.getElementById("message-container").innerHTML += `${xhr.responseText}`;
            // document.getElementById("message-container").innerHTML += xhr.responseText;
		} else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
			alert(
				`Could not complete request\nCode: ${xhr.status}\n${xhr.statusText}`
			);
		}
	});

	xhr.send(null);
});

const getMessages = (displayNum, showMore) => {
	// can differentiate between SHOW MORE button and selected radio button
}