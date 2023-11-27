const express = require("express");
const router = express.Router();
const VehiculosModel = require("../models/vehiculosModel");
const CeldasModel = require("../models/celdasModel");
const ReservasModel = require("../models/reservasModel");

// Ruta get para renderizar el perfil de usuario
router.get("/profile", (req, res) => {
  console.log("Session before querying for vehicle:", req.session);
  if (req.session.user) {
    VehiculosModel.getVehiculoByIdUsuario(
      req.session.user.id_usuario,
      (error, results) => {
        console.log("Direct query results:", results);

        if (error) {
          console.log(error);
          req.session.message = {
            type: "error",
            text: "Error al obtener los datos del vehículo",
          };
          res.render("user/profile", {
            user: req.session.user,
            message: req.session.message,
          });
        } else {
          const vehiculo = results.length > 0 ? results[0] : {};

          req.session.user = {
            ...req.session.user,
            vehiculo: vehiculo,
          };

          console.log("Session after login:", req.session);

          res.render("user/profile", {
            user: req.session.user,
            vehiculo: vehiculo,
          });
        }
      }
    );
  } else {
    res.redirect("/");
  }
});

// Ruta get para renderizar el inicio del usuario
router.get("/home", async (req, res) => {
  try {
    // Verificar si el usuario está autenticado antes de proceder
    if (!req.session.user || !req.session.user.id_usuario) {
      console.log("Usuario no autenticado");
      return res.redirect("/"); // Redirigir a la página principal si el usuario no está autenticado
    }

    const celdasDisponibles = await CeldasModel.getCeldasDisponibles();

    const vehiculosUsuario = await VehiculosModel.getVehiculoByIdUsuario(
      req.session.user.id_usuario
    );

    // Obtener el mensaje de la sesión y limpiarlo
    const message = req.session.message;
    req.session.message = null;

    res.render("user/home.ejs", {
      celdasDisponibles: celdasDisponibles,
      vehiculosUsuario: vehiculosUsuario,
      message: message || {},
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.redirect("/"); // Redirigir en caso de error
  }
});

// Ruta post que el usuario pueda hacer una reserva
router.post("/reservar", (req, res) => {
  // Obtener los datos del formulario
  const idCelda = req.body.id_celda;

  // Lógica para crear la reserva en la base de datos, utilizando los datos del formulario
  const reserva = {
    id_usuario: req.session.user.id_usuario,
    id_celda: idCelda,
    fecha_reserva: new Date(),
    tipo_vehiculo: req.session.user.vehiculo
      ? req.session.user.vehiculo.tipo_vehiculo
      : null,
    placa_vehiculo: req.session.user.vehiculo
      ? req.session.user.vehiculo.placa
      : null,
    estado_reserva: "Pendiente",
  };

  ReservasModel.createReserva(reserva, (error, results) => {
    let message = null;

    if (error) {
      console.error("Error al crear reserva en la base de datos:", error);
      message = {
        type: "error",
        text: "Error al realizar la reserva",
      };
    } else {
      message = {
        type: "success",
        text: "Reserva exitosa, ahora ve a la sección reservas para verificar el estado de tu reserva en la cola",
      };
    }

    req.session.message = message;

    res.redirect("/user/home");
  });
});

// Función de logout para usuario
router.post("/logout", (req, res) => {
  // Destruir la sección para poder hacer logout
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.redirect("/user/profile");
    }

    // Redirigir a la página de inicio de sesión
    res.redirect("/");
  });
});

// Ruta get para insertar la información de reservas
router.get("/reservations", async (req, res) => {
  try {
    // Verificar si el usuario está autenticado antes de proceder
    if (!req.session.user || !req.session.user.id_usuario) {
      console.log("Usuario no autenticado");
      return res.redirect("/"); // Redirigir a la página principal si el usuario no está autenticado
    }

    // Obtener historial de reservas desde la base de datos asociadas al id_usuario
    const historialReservas = await ReservasModel.getReservasByIdUsuario(
      req.session.user.id_usuario
    );

    res.render("user/reservations.ejs", {
      historialReservas: historialReservas,
    });
  } catch (error) {
    console.error("Error al obtener historial de reservas:", error);
    res.redirect("/");
  }
});
module.exports = router;
