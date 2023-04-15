const API_KEY = "4b936bd5a7fe3d6313f58aff477d602f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

document.addEventListener("DOMContentLoaded", fetchUpcomingMovies);

async function fetchUpcomingMovies() {
  const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=es&primary_release_year=2023`;
  const response = await fetch(url);
  const data = await response.json();
  displayUpcomingMovies(data.results);
}

function displayUpcomingMovies(movies) {
  const upcomingMoviesDiv = document.getElementById("upcoming-movies");

  for (const movie of movies) {
    const movieCard = createMovieCard(movie);
    upcomingMoviesDiv.appendChild(movieCard);
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
