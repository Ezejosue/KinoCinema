// Obtén una referencia al menú de navegación y al botón de activación
const navMenu = document.querySelector("#navbarNav");
const navButton = document.querySelector(".navbar-toggler");

// Función para cerrar el menú de navegación
function closeNavMenu() {
  navMenu.classList.remove("show");
}

// Agrega un controlador de eventos a cada enlace de navegación
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", closeNavMenu);
});

// Agrega un controlador de eventos al documento para cerrar el menú cuando se haga clic fuera de él
document.addEventListener("click", (event) => {
  if (
    !navMenu.contains(event.target) &&
    !navButton.contains(event.target) &&
    navMenu.classList.contains("show")
  ) {
    closeNavMenu();
  }
});
