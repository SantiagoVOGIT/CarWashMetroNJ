const express = require("express");
const router = express.Router();
const VehiculosModel = require("../models/vehiculosModel");
const CeldasModel = require("../models/celdasModel");
const ReservasModel = require("../models/reservasModel");

router.get("/profile", (req, res) => {
  console.log("Session before querying for vehicle:", req.session);
  if (req.session.user) {
    VehiculosModel.getVehiculoByIdUsuario(
      req.session.user.id_usuario,
      (error, results) => {
        console.log("Direct query results:", results);

        if (error) {
          console.log(error);
          res.render("user/profile", {
            user: req.session.user,
            message: {
              type: "error",
              text: "Error al obtener los datos del vehículo",
            },
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

router.get("/home", async (req, res) => {
  try {
    // Verificar si el usuario está autenticado antes de proceder
    if (!req.session.user || !req.session.user.id_usuario) {
      console.log("Usuario no autenticado");
      return res.redirect("/"); // Redirigir a la página principal si el usuario no está autenticado
    }

    // Obtener celdas disponibles desde la base de datos
    const celdasDisponibles = await CeldasModel.getCeldasDisponibles();

    // Obtener vehículos del usuario desde la base de datos
    const vehiculosUsuario = await VehiculosModel.getVehiculoByIdUsuario(
      req.session.user.id_usuario
    );

    // Renderizar la vista home.ejs con los datos necesarios
    res.render("user/home.ejs", {
      celdasDisponibles: celdasDisponibles,
      vehiculosUsuario: vehiculosUsuario,
      message: {}, // Establecer un objeto message predeterminado
    });
  } catch (error) {
    console.error("Error al obtener datos:", error);
    res.redirect("/"); // Redirigir en caso de error
  }
});

router.post("/reservar", (req, res) => {
  console.log("Datos del usuario en la sesión:", req.session.user);

  // Verificar si el usuario está autenticado antes de proceder con la reserva
  if (!req.session.user || !req.session.user.id_usuario) {
    console.log("Usuario no autenticado");
    return res.redirect("/"); // Redirige a la página principal si el usuario no está autenticado
  }

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
    if (error) {
      console.error("Error al crear reserva en la base de datos:", error);
      return res.redirect(
        "/user/home?message=error&text=Error%20al%20realizar%20la%20reserva"
      );
    }

    // Verificar si la reserva se realizó correctamente
    if (results && results.insertId) {
      // Redirigir a la vista "home.ejs" con un mensaje de reserva exitosa
      return res.redirect("/user/home?message=success&text=Reserva%20exitosa");
    } else {
      // Redirigir a la vista "home.ejs" con un mensaje de error en la reserva
      return res.redirect(
        "/user/home?message=error&text=Error%20al%20realizar%20la%20reserva"
      );
    }
  });
});

module.exports = router;
