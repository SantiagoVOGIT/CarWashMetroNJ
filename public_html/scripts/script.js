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

// Script para staff.ejs

// Función para mostrar u ocultar un aviso

function mostrarAviso(empleado) {
  // Llenar los campos del formulario con la información del empleado
  document.getElementById("id_empleado").value = empleado.id_empleado;
  document.getElementById("identificacion").value = empleado.identificacion;
  document.getElementById("nombre").value = empleado.nombre;
  document.getElementById("telefono").value = empleado.telefono || "";
  document.getElementById("correo").value = empleado.correo || "";
  document.getElementById("rol").value = empleado.rol || "";
  document.getElementById("estado").value = empleado.estado || "";

  // Mostrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay").style.display = "flex";
}

// Script para profile.ejs

function mostrarAvisoUser() {
  document.getElementById("dialog-overlay").style.display = "flex";
}

function cerrarAviso() {
  // Cerrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay").style.display = "none";
}

// Script para home.ejs

//Función que permite que al seleccionar el contenedor de la celda se seleccione el input radio y se aplique un estilo

function selectRadio(id) {
  let radioInput = document.querySelector(
    'input[name="id_celda"][value="' + id + '"]'
  );

  // Selecciona el input radio
  if (radioInput) {
    radioInput.checked = true;

    let elements = document.querySelectorAll(".cells-container");
    elements.forEach(function (element) {
      element.classList.remove("selected");
    });

    let clickedElement = document.querySelector(
      '.cells-container[data-id="' + id + '"]'
    );
    if (clickedElement) {
      clickedElement.classList.add("selected");
    }
  }
}
