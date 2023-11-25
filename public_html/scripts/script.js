// Script para index.js

// Función para cambiar el login de usuario a admin mediante el checkbox (index.js)
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

// Función para mostrar u ocultar la contraseña en el login de user
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

// Función para mostrar u ocultar la contraseña en el login de admin (index.js)
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

// Script para profile.ejs

// Función para mostrar u ocultar un aviso

function mostrarAviso() {
  // Mostrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay").style.display = "flex";
}

function cerrarAviso() {
  // Cerrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay").style.display = "none";
}

// Script para home.ejs

//Función que permite que al seleccionar el contenedor de la celda se seleccione el input radio y se aplique un estilo
function selectRadio(id) {
  // Encuentra el input radio correspondiente al ID de la celda
  var radioInput = document.querySelector(
    'input[name="id_celda"][value="' + id + '"]'
  );

  // Selecciona el input radio
  if (radioInput) {
    radioInput.checked = true;

    // Desactivar la clase 'selected' para todos los elementos con la clase 'cells-container'
    var elements = document.querySelectorAll(".cells-container");
    elements.forEach(function (element) {
      element.classList.remove("selected");
    });

    // Activar la clase 'selected' solo para el elemento clicado
    var clickedElement = document.querySelector(
      '.cells-container[data-id="' + id + '"]'
    );
    if (clickedElement) {
      clickedElement.classList.add("selected");
    }
  }
}
