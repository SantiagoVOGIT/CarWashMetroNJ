const express = require("express");
const router = express.Router();
const AdminsModel = require("../models/adminsModel");
const CeldasModel = require("../models/celdasModel");
const ReservasModel = require("../models/reservasModel");
const UsuariosModel = require("../models/usuariosModel");
const EmpleadosModel = require("../models/empleadosModel");

router.post("/", (req, res) => {
  const { correo, contrasena } = req.body;

  AdminsModel.getAdminByCorreoContrasena(
    correo,
    contrasena,
    (error, results) => {
      if (error) {
        console.log(error);
        res.render("index.ejs", {
          message: { type: "error", text: "Error al iniciar sesión" },
        });
      } else {
        if (results.length > 0) {
          const admin = results[0];

          // Si es un administrador, establecer la sesión y redirigir a dashboard
          req.session.admin = {
            id_admin: admin.id_admin,
          };

          res.redirect("/admin/dashboard");
        } else {
          res.render("index.ejs", {
            message: {
              type: "error",
              text: "Correo o contraseña incorrectos",
            },
          });
        }
      }
    }
  );
});

router.get("/dashboard", async (req, res) => {
  if (req.session.admin) {
    try {
      // Obtener la información de las celdas desde el modelo
      const celdas = await CeldasModel.getCeldas();

      // Renderizar la página de dashboard.ejs con la información de las celdas
      res.render("admin/dashboard.ejs", { celdas });
    } catch (error) {
      console.error("Error al obtener celdas:", error);
      res.render("admin/dashboard.ejs", {
        message: {
          type: "error",
          text: "Error al obtener la información de las celdas",
        },
      });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/settings", (req, res) => {
  if (req.session.admin) {
    // Obtén la información de todos los administradores
    AdminsModel.getAllAdmins((err, admins) => {
      if (err) {
        console.error(
          "Error al obtener la información de los administradores:",
          err
        );
        res.redirect("/");
        return;
      }

      // Renderiza la página settings.ejs y pasa la información de los administradores
      res.render("admin/settings.ejs", { admins, req }); // Asegúrate de pasar req aquí
    });
  } else {
    res.redirect("/");
  }
});

router.get("/staff", async (req, res) => {
  try {
    if (req.session.admin) {
      const empleados = await EmpleadosModel.getAllEmpleados();
      res.render("admin/staff.ejs", { empleados });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.render("admin/staff.ejs", {
      message: {
        type: "error",
        text: "Error al obtener la información de los empleados",
      },
    });
  }
});

router.get("/reservationsDashboard", async (req, res) => {
  if (req.session.admin) {
    try {
      // Obtener la información de todas las reservas desde el modelo
      const todasLasReservas = await ReservasModel.getAllReservas();

      // Obtener la información de todos los usuarios desde el modelo
      const todosLosUsuarios = await UsuariosModel.getAllUsers();

      todasLasReservas.sort(
        (a, b) => new Date(b.fecha_reserva) - new Date(a.fecha_reserva)
      );
      // Renderizar la página de reservationsDashboard.ejs con la información de todas las reservas y usuarios
      res.render("admin/reservationsDashboard.ejs", {
        todasLasReservas,
        todosLosUsuarios,
        usuarios: todosLosUsuarios,
      });
    } catch (error) {
      console.error("Error al obtener reservas y usuarios:", error);
      res.render("admin/reservationsDashboard.ejs", {
        message: {
          type: "error",
          text: "Error al obtener la información de reservas y usuarios",
        },
      });
    }
  } else {
    res.redirect("/");
  }
});

router.post("/update-cell-status", async (req, res) => {
  try {
    const { celdaId, isChecked } = req.body;

    console.log("Actualizando celda con ID:", celdaId, "isChecked:", isChecked);

    // Actualiza el estado de la celda según el valor del checkbox
    const nuevoEstado = isChecked === "true" ? false : true;
    await CeldasModel.updateEstadoCelda(celdaId, nuevoEstado);

    console.log("Celda actualizada correctamente.");

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error al actualizar el estado de la celda:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/reservas/actualizarEstado/:idReserva", async (req, res) => {
  try {
    const idReserva = req.params.idReserva;
    const nuevoEstado = req.body.estado;

    console.log(`ID de reserva: ${idReserva}, Nuevo estado: ${nuevoEstado}`);

    await ReservasModel.updateReservaStatus(idReserva, nuevoEstado);

    console.log(
      `Estado de la reserva con ID ${idReserva} actualizado a ${nuevoEstado}`
    );

    // Redirige a la página de reservas después de la actualización
    res.redirect("/admin/reservationsDashboard");
  } catch (error) {
    console.error("Error al actualizar el estado de la reserva:", error);

    // Manejar el error redirigiendo a la página de reservas
    res.redirect("/admin/reservationsDashboard");
  }
});

router.post("/staff/update/:idEmpleado", async (req, res) => {
  try {
    const idEmpleado = req.params.idEmpleado;
    console.log("ID del Empleado:", idEmpleado);
    const { identificacion, nombre, telefono, correo, rol, estado } = req.body;

    const newData = {
      identificacion,
      nombre,
      telefono,
      correo,
      rol,
      estado,
    };

    await EmpleadosModel.updateEmpleado(idEmpleado, newData);
    res.redirect("/admin/staff");
  } catch (error) {
    console.error("Error al actualizar el empleado:", error);
    res.redirect("/admin/staff");
  }
});

router.post("/staff/delete/:idEmpleado", async (req, res) => {
  try {
    const idEmpleado = req.params.idEmpleado;

    await EmpleadosModel.deleteEmpleado(idEmpleado);
    res.redirect("/admin/staff");
  } catch (error) {
    console.error("Error al eliminar el empleado:", error);
    res.redirect("/admin/staff");
  }
});
router.post("/staff/add", async (req, res) => {
  try {
    const { identificacion, nombre, telefono, correo, rol, estado } = req.body;

    const nuevoEmpleado = {
      identificacion,
      nombre,
      telefono,
      correo,
      rol,
      estado,
    };

    // Lógica para agregar el nuevo empleado al modelo
    await EmpleadosModel.addEmpleado(nuevoEmpleado);

    res.redirect("/admin/staff");
  } catch (error) {
    console.error("Error al agregar el empleado:", error);
    res.redirect("/admin/staff");
  }
});

router.post("/logout", (req, res) => {
  // Destruir la sesión
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    // Redirigir a la página de inicio de sesión
    res.redirect("/");
  });
});

module.exports = router;
