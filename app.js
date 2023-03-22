const API_KEY = "4b936bd5a7fe3d6313f58aff477d602f"; // Reemplaza esto con tu propia clave API de TMDB.
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("search-input").value;
  searchMovies(query);
});

async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await response.json();
  displayResults(data.results);
}

function displayResults(movies) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  for (const movie of movies) {
    const movieCard = createMovieCard(movie);
    resultsDiv.appendChild(movieCard);
  }
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "card col-md-4 col-lg-3 mb-4 my-2";
  const imagePath = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image+Available";

  const cardContent = `
    <img src="${imagePath}" class="card-img-top" alt="${movie.title}">
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">Fecha de lanzamiento: ${
        movie.release_date || "N/A"
      }</p>
      <p class="card-text">Calificación: ${movie.vote_average || "N/A"}</p>
      <p class="card-text">${
        movie.overview
          ? movie.overview.slice(0, 100) + "..."
          : "No hay descripción disponible."
      }</p>
    </div>
  `;

  card.innerHTML = cardContent;
  return card;
}
