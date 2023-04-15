const API_KEY = "4b936bd5a7fe3d6313f58aff477d602f";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchMovies() {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es&primary_release_year=2023`
  );
  const data = await response.json();
  const moviesWithRatings = await Promise.all(
    data.results.map(async (movie) => {
      const details = await fetchMovieDetails(movie.id);
      movie.classification = details.classification;
      return movie;
    })
  );
  displayMovies(moviesWithRatings);
}

async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es`
  );
  const data = await response.json();
  const classification = data.certification || "N/A";
  return { classification };
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
           <p class="card-text">Clasificación: ${
             movie.classification || "N/A"
           }</p>
          <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#reservationModal" onclick="openReservationModal('${
            movie.title
          }')">Reservar</button>
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
// ...

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();

  // Obtiene el formulario y agrega el controlador de eventos
  const form = document.getElementById("reservationModal");
  form.addEventListener("submit", handleSubmit);

  // Agrega un controlador de eventos al botón "Reservar"
  document
    .getElementById("reserve-btn")
    .addEventListener("click", handleSubmit);
});

function handleSubmit(event) {
  event.preventDefault();

  // Obtiene los elementos de entrada del formulario
  const movie = document.getElementById("movieTitle");
  const date = document.getElementById("date");
  const time = document.getElementById("time");

  // Comprueba si los campos están vacíos
  if (!movie.value || !date.value || !time.value) {
    // Muestra una alerta de error si uno de los campos está vacío
    swal({
      title: "Error",
      text: "Por favor, completa todos los campos.",
      icon: "error",
      button: "OK",
    });
    return; // Salir de la función si los campos no son válidos
  }

  // Utiliza SweetAlert en lugar de alert()
  swal({
    title: "¡Éxito!",
    text: "Reserva realizada con éxito.",
    icon: "success",
    button: "OK",
  }).then(() => {
    location.reload(); // Recarga la página después de cerrar la alerta
  });
}
