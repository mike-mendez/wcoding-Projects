const page = (num) => {
    let aID = document.querySelector('input[name="article_id"]');
	let xhr = new XMLHttpRequest();

	xhr.open("GET", `./commentCreation.php?articleid=${aID.value}&offset=${num}`);

	xhr.addEventListener("readystatechange", () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			document.querySelector("#comments-container > div").innerHTML = xhr.responseText;
		} else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status !== 200) {
			alert(
				`Could not complete request\nCode: ${xhr.status}\n${xhr.statusText}`
			);
		}
	});

	xhr.send(null);
};
