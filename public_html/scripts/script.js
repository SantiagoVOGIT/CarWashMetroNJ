// Función para cambiar el login de usuario a admin
document.getElementById("usePassword").addEventListener("change", function (e) {
  let usePassword = document.getElementById("usePassword").checked;
  let identificacionInput = document.getElementById("identificacion");
  let telefonoInput = document.getElementById("telefono");
  if (usePassword) {
    telefonoInput.name = "correo";
    telefonoInput.placeholder = "Correo de administrador";
    telefonoInput.title = "Se requiere correo de administrador";
    identificacionInput.name = "contrasena";
    identificacionInput.placeholder = "Contraseña";
    identificacionInput.title = "Se requiere contraseña de administrador";
  } else {
    telefonoInput.name = "telefono";
    telefonoInput.placeholder = "Teléfono";
    telefonoInput.title = "Número de celular o teléfono que registraste";
    identificacionInput.name = "identificacion";
    identificacionInput.placeholder = "Identificación";
    identificacionInput.title = "Número de identificacion que registraste";
  }
});

function togglePassword() {
  var passwordInput = document.getElementById("identificacion");
  var toggleIcon = document.getElementById("toggle-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.textContent = "visibility";
  } else {
    passwordInput.type = "password";
    toggleIcon.textContent = "visibility_off";
  }
}
