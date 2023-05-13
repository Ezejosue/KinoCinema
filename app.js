const API_KEY = "4b936bd5a7fe3d6313f58aff477d602f"; // Reemplaza esto con tu propia clave API de TMDB.
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("search-input").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value;
  searchMovies(query, genre, year);
});

async function searchMovies(query, genre, year) {
  let url;
  if (query) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES`;
  } else {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=es-ES`;
  }
  if (genre) {
    url += `&with_genres=${genre}`;
  }
  if (year) {
    url += `&primary_release_year=${year}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  displayResults(data.results);
}

function displayResults(movies) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (movies.length === 0) {
    // Si no hay resultados, muestra un mensaje
    const noResultsMsg = document.createElement("p");
    noResultsMsg.innerHTML = `
    
            <h2 class="text-white">No se encontraron películas con los criterios de búsqueda proporcionados.</h2>
    `;
    resultsDiv.appendChild(noResultsMsg);
  } else {
    // Si hay resultados, muestra las tarjetas de películas
    for (const movie of movies) {
      const movieCard = createMovieCard(movie);
      resultsDiv.appendChild(movieCard);
    }
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

document.getElementById("clear-btn").addEventListener("click", () => {
  // Limpia los campos de búsqueda, género y año
  document.getElementById("search-input").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("year").value = "";

  // Limpia los resultados de la búsqueda
  document.getElementById("results").innerHTML = "";
});

async function fetchGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
  );
  const data = await response.json();
  const genreSelect = document.getElementById("genre");
  data.genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.innerText = genre.name;
    genreSelect.appendChild(option);
  });
}

// Llama a fetchGenres cuando se carga la página
document.addEventListener("DOMContentLoaded", fetchGenres);

