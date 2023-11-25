// Función para cambiar el login de usuario a admin mediante el checkbox
document.getElementById("usePassword").addEventListener("change", function () {
  var form1 = document.getElementById("myForm");
  var form2 = document.getElementById("loginAdminForm");
  if (this.checked) {
    form1.style.display = "none";
    form2.style.display = "block";
  } else {
    form1.style.display = "block";
    form2.style.display = "none";
  }
});

// Función para mostrar u ocultar la contraseña en el login de admin
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

// Función para mostrar u ocultar la contraseña en el login de admin
function togglePasswordAdmin() {
  var passwordInput = document.getElementById("contrasena");
  var toggleIcon = document.getElementById("toggle-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.textContent = "visibility";
  } else {
    passwordInput.type = "password";
    toggleIcon.textContent = "visibility_off";
  }
}

// Función para mostrar u ocultar un aviso

function mostrarAviso() {
  // Mostrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay").style.display = "flex";
}

function cerrarAviso() {
  // Cerrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay").style.display = "none";
}
