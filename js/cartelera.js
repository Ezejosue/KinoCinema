const API_KEY = "4b936bd5a7fe3d6313f58aff477d602f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchMovies() {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
  );
  const data = await response.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  const movieList = document.getElementById("movie-list");

  for (const movie of movies) {
    const movieCard = createMovieCard(movie);
    movieList.appendChild(movieCard);
  }
}

function displayAvailableTimes() {
  const availableTimes = ["10:00", "12:30", "15:00", "17:30", "20:00", "22:30"];
  const timesContainer = document.getElementById("availableTimes");
  timesContainer.innerHTML = "";

  availableTimes.forEach((time) => {
    const timeButton = document.createElement("button");
    timeButton.className = "btn btn-outline-primary mx-1 my-1";
    timeButton.innerText = time;
    timeButton.onclick = () => selectTime(time);
    timesContainer.appendChild(timeButton);
  });
}

function selectTime(time) {
  const timeButtons = document.querySelectorAll("#availableTimes button");
  timeButtons.forEach((button) => {
    if (button.innerText === time) {
      button.classList.add("selected-time");
    } else {
      button.classList.remove("selected-time");
    }
  });
  document.getElementById("time").value = time;
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "col";

  const imagePath = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image+Available";

  card.innerHTML = `
      <div class="card h-100">
        <img src="${imagePath}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#reservationModal" onclick="openReservationModal('${movie.title}')">Reservar</button>
        </div>
      </div>
    `;

  return card;
}

function openReservationModal(movieTitle) {
  document.getElementById("movieTitle").value = movieTitle;
  displayAvailableTimes();
}

// Llama a fetchMovies cuando se carga la página
document.addEventListener("DOMContentLoaded", fetchMovies);

// Aleta de éxito
document.getElementById("reserve-btn").addEventListener("click", (event) => {
  event.preventDefault();
  alert("¡Reserva realizada con éxito!");
  location.reload(); // Recarga la página
});
