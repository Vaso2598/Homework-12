const API_URL =
	"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const search = document.getElementById("search");
const form = document.getElementById("form");
const main = document.getElementById("main");

fetchMovies(API_URL);

async function fetchMovies(url) {
	// console.log(url);
	const res = await fetch(url);
	// console.log(res);
	const data = await res.json();
	// console.log(data);
	showMovies(data.results);
}

function showMovies(movies) {
	console.log(movies);
	main.innerHTML = "";

	movies.map((movie) => {
		const {title, poster_path, release_date, vote_average} = movie;
		const movieElement = document.createElement("div");
		movieElement.classList.add("movie");
		movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div>
                <h2>${title}</h2>
                <span class="date">${release_date.slice(0, 4)}</span>
                <span class="rating ${classByRating(vote_average)}">${vote_average.toFixed(2)}</span>
            </div>
        `;
		main.appendChild(movieElement);
	});
}

function classByRating(rating) {
	if (rating >= 7) {
		return "green";
	} else if (rating >= 5) {
		return "orange";
	} else {
		return "red";
	}
}
