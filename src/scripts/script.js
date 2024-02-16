const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2U3NjE1ZmI2MTE5OGI2ZWVlNzlmZThmMTlkMGRjYSIsInN1YiI6IjY1Y2U3NmY4MTA5MjMwMDE3YzBmMGU0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TCHor_aJoxZ_hvDmqlqVKB15yiyO4oAh0tEUJ7-T77Y",
	},
};

// Movie List API

fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options)
	.then((movieList) => movieList.json())
	.then((movieList) => {
		renderMovies(movieList.results);
	})
	.catch((err) => console.error(err));

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const renderMovies = (movies) => {
	console.log(movies);
	main.innerHTML = "";

	movies.map((movie) => {
		const {title, poster_path, release_date, vote_average, id} = movie;
		const movieElement = document.createElement("div");
		movieElement.classList.add("movie");
		movieElement.innerHTML = `
		 <img src="${IMG_PATH + poster_path}" alt="${title}">
             <div>
                 <h3>${title}</h3>
                 <span class="date">${release_date.slice(0, 4)}</span>
                 <span class="rating ${classByRating(vote_average)}">${vote_average.toFixed(2)}</span>
             </div>
         `;
		movieElement.addEventListener("click", () => {
			window.location.href = `./description.html?id=${id}`;
		});
		main.appendChild(movieElement);
	});
};

function classByRating(rating) {
	if (rating >= 7) {
		return "green";
	} else if (rating >= 5) {
		return "orange";
	} else {
		return "red";
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchTerm = search.value;
	// console.log(searchTerm);

	if (searchTerm && searchTerm !== "") {
		fetchMovies(SEARCH_API + searchTerm);
		search.value = "";
	} else {
		window.location.reload();
	}
});
