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
function mostrarAvisoModifyStaff(empleado) {
  console.log("ID del empleado seleccionado:", empleado.id_empleado);
  console.log("Empleado seleccionado:", empleado);

  // Llenar los campos del formulario con la información del empleado

  document.getElementById("id_empleado_modificar").value = empleado.id_empleado;
  document.getElementById("identificacion_modificar").value =
    empleado.identificacion;
  document.getElementById("nombre_modificar").value = empleado.nombre;
  document.getElementById("telefono_modificar").value = empleado.telefono || "";
  document.getElementById("correo_modificar").value = empleado.correo || "";
  document.getElementById("rol_modificar").value = empleado.rol || "";
  document.getElementById("estado_modificar").value = empleado.estado || "";

  // Mostrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay").style.display = "flex";
}
function cerrarAviso() {
  // Cerrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay").style.display = "none";
}
function guardarCambios() {
  // Obtener el valor del id_empleado
  const idEmpleado = document.getElementById("id_empleado_modificar").value;

  // Construir la URL dinámicamente
  const url = `/admin/staff/update/${idEmpleado}`;

  // Actualizar el atributo action del formulario con la URL construida
  document.getElementById("modificarEmpleadoForm").action = url;

  // Enviar el formulario
  document.getElementById("modificarEmpleadoForm").submit();
}

// Script para profile.ejs

function mostrarAvisoUser() {
  document.getElementById("dialog-overlay").style.display = "flex";
}
function mostrarAvisoUser() {
  document.getElementById("dialog-overlay").style.display = "flex";
}

function cerrarAvisoAddStaff() {
  // Cerrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay-add-staff").style.display = "none";
}

function mostrarAvisoAddStaff() {
  // Cerrar el cuadro de diálogo personalizado
  document.getElementById("dialog-overlay-add-staff").style.display = "flex";
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
