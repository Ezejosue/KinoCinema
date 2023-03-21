const API_KEY = "4b936bd5a7fe3d6313f58aff477d602f"; // Reemplaza esto con tu propia clave API de TMDB.
const API_URL = "https://api.themoviedb.org/3/movie/now_playing";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesContainer = document.getElementById("movies");

fetch(`${API_URL}?api_key=${API_KEY}&language=es-ES&page=1`)
  .then((res) => res.json())
  .then((data) => {
    displayMovies(data.results.slice(0, 6));
  });

  
function displayMovies(movies) {
  moviesContainer.innerHTML = movies
    .map((movie) => {
      return `
            <div class="col-md-4 mt-4">
                <div class="card">
                    <img src="${
                      IMG_URL + movie.poster_path
                    }" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview.substr(
                          0,
                          100
                        )}...</p>
                    </div>
                </div>
            </div>`;
    })
    .join("");
}
