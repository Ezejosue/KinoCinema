function showAlert(title, text, callback) {
  Swal.fire({
    icon: "info",
    title: title,
    text: text,
  }).then(function () {
    if (typeof callback === "function") {
      callback();
    }
  });
}

// Función para abrir el modal de registro
function openRegisterModal() {
  var registerModal = new bootstrap.Modal(
    document.getElementById("registerModal")
  );
  registerModal.show();
}

// Función para abrir el modal de olvidar clave
function openForgotPasswordModal() {
  var forgotPasswordModal = new bootstrap.Modal(
    document.getElementById("forgotPasswordModal")
  );
  forgotPasswordModal.show();
}

// Función para validar el formulario de inicio de sesión
function validateLoginForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Verifica que se hayan ingresado datos en los campos de correo electrónico y contraseña
  if (email.trim() === "" || password.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, ingresa tu correo electrónico y contraseña.",
    });
    return false;
  }

  // Simulación de inicio de sesión exitoso con SweetAlert2
  Swal.fire({
    icon: "success",
    title: "Inicio de sesión exitoso",
    text: `Bienvenido: ${email}`,
  }).then(() => {
    location.reload(); // Recarga la página después de cerrar la alerta
  });

  // Redirige al usuario a otra página después de iniciar sesión (a modo de ejemplo)
  // window.location.href = '/dashboard';

  // Evita que el formulario se envíe de forma predeterminada
  return false;
}

// Asigna el evento click al botón de inicio de sesión
var loginButton = document.querySelector("#loginModal .btn-warning");
loginButton.addEventListener("click", validateLoginForm);

// Asigna el evento click a la opción de registrarte
var registerLink = document.querySelector(
  "#loginModal .label-options a:nth-child(2)"
);
registerLink.addEventListener("click", openRegisterModal);

// Asigna el evento click al botón de registro
var registerButton = document.querySelector("#registerModal .btn-primary");
registerButton.addEventListener("click", function () {
  showAlert(
    "Registro",
    "El registro se ha realizado exitosamente.",
    function () {
      location.reload();
    }
  );
  var registerModal = new bootstrap.Modal(
    document.getElementById("registerModal")
  );
  registerModal.hide();
});

// Asigna el evento click al botón cerrar del modal de registro
var registerModalCloseButton = document.querySelector(
  "#registerModal .btn-close"
);
registerModalCloseButton.addEventListener("click", function () {
  var loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
});

// Asigna el evento click a la opción de olvidar clave
var forgotPasswordLink = document.querySelector(
  "#loginModal .label-options a:first-child"
);
forgotPasswordLink.addEventListener("click", openForgotPasswordModal);

// Asigna el evento click al botón de enviar en el modal de olvidar clave
var forgotPasswordButton = document.querySelector(
  "#forgotPasswordModal .btn-primary"
);
forgotPasswordButton.addEventListener("click", function () {
  showAlert(
    "Recuperación de contraseña",
    "Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña.",
    function () {
      location.reload();
    }
  );
  var forgotModal = new bootstrap.Modal(
    document.getElementById("forgot-email")
  );
  forgotModal.hide();
});
