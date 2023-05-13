/* // Obtener el contenedor donde se agregarán las filas y butacas
const leftContainer = document.querySelector(".left-container");
const rightContainer = document.querySelector(".right-container");

// Número de filas y columnas
const rows = 5;
const columns = 8;

// Crear las filas y butacas
for (let i = 0; i < rows; i++) {
  // Crear una nueva fila
  const row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < columns; j++) {
    // Crear una nueva butaca
    const seat = document.createElement("button");
    seat.classList.add("seat");

    // Agregar la butaca a la fila
    row.appendChild(seat);
  }

  // Agregar la fila al contenedor
  leftContainer.appendChild(row);
  rightContainer.appendChild(row.cloneNode(true));
}

// Obtener todos los botones
const seats = [...document.querySelectorAll(".seat")];
const ticketsInput = document.querySelector("#tickets");

// Agregar un controlador de eventos click a cada botón
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    // Obtener el número de butacas seleccionadas y el valor del input
    const selectedSeats = document.querySelectorAll(".seat.selected").length;
    const tickets = parseInt(ticketsInput.value);

    // Verificar si el número de butacas seleccionadas es menor o igual al valor del input
    if (selectedSeats < tickets || seat.classList.contains("selected")) {
      // Cambiar la clase CSS del botón
      seat.classList.toggle("selected");
    }
  });
});

// Obtener el modal
const reservationModal = document.querySelector("#reservationModal");
// Agregar un controlador de eventos al modal
reservationModal.addEventListener("show.bs.modal", () => {
  // Número de butacas a seleccionar
  const seatsToSelect = 15;

  // Seleccionar butacas aleatoriamente
  for (let i = 0; i < seatsToSelect; i++) {
    // Generar un índice aleatorio
    const index = Math.floor(Math.random() * seats.length);

    // Seleccionar la butaca en el índice aleatorio
    seats[index].classList.add("selected");

    // Remover la butaca seleccionada del arreglo
    seats.splice(index, 1);
  }
});

// Agregar un controlador de eventos al modal
reservationModal.addEventListener("hide.bs.modal", () => {
  // Deseleccionar todas las butacas seleccionadas
  seats.forEach((seat) => {
    seat.classList.remove("selected");
  });
});
 */

// Obtener el contenedor donde se agregarán las filas y butacas
const leftContainer = document.querySelector(".left-container");
const rightContainer = document.querySelector(".right-container");

// Número de filas y columnas
const rows = 5;
const columns = 8;

// Crear las filas y butacas
for (let i = 0; i < rows; i++) {
  // Crear una nueva fila
  const row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < columns; j++) {
    // Crear una nueva butaca
    const seat = document.createElement("div");
    seat.classList.add("seat");

    // Agregar la butaca a la fila
    row.appendChild(seat);
  }

  // Agregar la fila al contenedor
  leftContainer.appendChild(row);
  rightContainer.appendChild(row.cloneNode(true));
}

// Obtener todos los botones
const seats = [...document.querySelectorAll(".seat")];
const ticketsInput = document.querySelector("#tickets");

// Number of seats to mark as occupied
const occupiedSeats = 10;

// Create an array of seat indexes
const seatIndexes = [...Array(rows * columns).keys()];

// Shuffle the array
for (let i = seatIndexes.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [seatIndexes[i], seatIndexes[j]] = [seatIndexes[j], seatIndexes[i]];
}

// Mark the first N seats as occupied
for (let i = 0; i < occupiedSeats; i++) {
  seats[seatIndexes[i]].classList.add("occupied");
}

// Agregar un controlador de eventos click a cada botón
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    // Check if the seat is not occupied
    if (!seat.classList.contains("occupied")) {
      // Get the number of selected seats and the value of the input
      const selectedSeats = document.querySelectorAll(".seat.selected").length;
      const tickets = parseInt(ticketsInput.value);

      // Check if the number of selected seats is less than or equal to the value of the input
      if (selectedSeats < tickets || seat.classList.contains("selected")) {
        // Toggle the selected class of the seat
        seat.classList.toggle("selected");
      }
    }
  });
});

const modal = document.getElementById("reservationModal");
$(modal).on("hidden.bs.modal", () => {
  // Obtener todos los asientos ocupados
  const occupiedSeats = document.querySelectorAll(".seat.occupied");

  // Eliminar la clase "occupied" de todos los asientos ocupados
  occupiedSeats.forEach((seat) => {
    seat.classList.remove("occupied");
  });

  // Número de asientos para marcar como ocupados
  const numOccupiedSeats = 10;

  // Crear una matriz de índices de asientos
  const seatIndexes = [...Array(rows * columns).keys()];

  // Mezclar la matriz
  for (let i = seatIndexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [seatIndexes[i], seatIndexes[j]] = [seatIndexes[j], seatIndexes[i]];
  }

  // Marcar los primeros N asientos como ocupados
  for (let i = 0; i < numOccupiedSeats; i++) {
    seats[seatIndexes[i]].classList.add("occupied");
  }
});
