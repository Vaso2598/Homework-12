const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2U3NjE1ZmI2MTE5OGI2ZWVlNzlmZThmMTlkMGRjYSIsInN1YiI6IjY1Y2U3NmY4MTA5MjMwMDE3YzBmMGU0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TCHor_aJoxZ_hvDmqlqVKB15yiyO4oAh0tEUJ7-T77Y",
	},
};

const urlParams = new URLSearchParams(window.location.search);
const movieID = urlParams.get("id");
// console.log(movieID);

fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options)
	.then((res) => res.json())
	.then((json) => {
		renderDescription(json);
		// console.log(renderDescription);
	});
// .catch((err) => console.error(err));

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const description = document.getElementById("description");
const form = document.getElementById("form");
const search = document.getElementById("search");
const seats = document.getElementById("seats");

const renderDescription = (json) => {
	// console.log(json);
	description.innerHTML = "";
	const overviewElement = document.createElement("div");
	overviewElement.classList.add("description");
	overviewElement.innerHTML = `
	<img class="backdropIMG" src="${IMG_PATH + json.backdrop_path}">
		<div>
			<img src="${IMG_PATH + json.poster_path}" alt="${json.title}">
		</div>
		<div class="overview">
			<h3>${json.title}</h3>
			<p class="date">${json.release_date}</p>
			<p>${json.overview}</p>
		</div>
	`;
	description.appendChild(overviewElement);
};

// Seats

let checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
let enabledSettings = [];
const sumEl = document.getElementById("sum");

checkboxes.forEach(function (checkbox) {
	checkbox.addEventListener("change", function () {
		enabledSettings = Array.from(checkboxes)
			.filter((i) => i.checked)
			.map((i) => i.value);

		// console.log(enabledSettings);
		let sum = 0;
		enabledSettings.map((price) => {
			// console.log(price);
			let priceFloat = parseFloat(price);
			// console.log(typeof priceInt);
			sum += priceFloat;
			// console.log(sum);
		});
		sumEl.innerHTML = sum + "$";
	});
});
