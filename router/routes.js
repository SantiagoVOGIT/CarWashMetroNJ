const express = require("express");
const router = express.Router();
const UsuariosModel = require("../models/usuariosModel");
const VehiculosModel = require("../models/vehiculosModel");

// Middleware para cargar datos de usuario y vehículo si el usuario está autenticado
router.use((req, res, next) => {
  if (req.session.user && req.session.user.id_usuario) {
    // Si el usuario está autenticado, cargar datos de vehículo si están disponibles
    VehiculosModel.getVehiculoByIdUsuario(
      req.session.user.id_usuario,
      (error, results) => {
        if (!error && results.length > 0) {
          const vehiculo = results[0];
          req.session.user = {
            ...req.session.user,
            vehiculo: vehiculo,
          };
        }
        next();
      }
    );
  } else {
    next();
  }
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.post("/register", (req, res) => {
  const usuario = {
    identificacion: req.body.identificacion,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
  };

  const vehiculo = {
    marca: req.body.marca,
    placa: req.body.placa,
    tipo_vehiculo: req.body.tipo_vehiculo,
  };

  UsuariosModel.createUser(usuario, (error, userResults) => {
    if (error) {
      console.log(error);
      req.session.message = {
        type: "error",
        text: "Error al registrar el usuario",
      };
      res.render("register", { message: req.session.message });
    } else {
      vehiculo.id_usuario = userResults.insertId;
      VehiculosModel.createVehiculo(vehiculo, (error, vehiculoResults) => {
        console.log("Vehiculo insertion results:", vehiculoResults);
        if (error) {
          console.log(error);
          req.session.message = {
            type: "error",
            text: "Error al registrar el vehículo",
          };
          res.render("register", { message: req.session.message });
        } else {
          req.session.user = {
            ...usuario,
            vehiculo: vehiculo,
          };

          req.session.message = {
            type: "success",
            text: "Registro exitoso, ahora inicia sesión con los datos que ingresaste",
          };

          res.render("register", { message: req.session.message });
        }
      });
    }
  });
});

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.post("/", (req, res) => {
  const user = {
    telefono: req.body.telefono,
    identificacion: req.body.identificacion,
  };

  UsuariosModel.getUserByTelefonoIdentificacion(
    user.telefono,
    user.identificacion,
    (error, results) => {
      if (error) {
        console.log(error);
        req.session.message = {
          type: "error",
          text: "Error al iniciar sesión",
        };
        res.render("index.ejs", { message: req.session.message });
      } else {
        if (results.length > 0) {
          req.session.user = results[0];
          console.log("Session after login:", req.session);

          // Limpiar el mensaje de la sesión antes de redirigir al usuario
          delete req.session.message;

          res.redirect("/user/home");
        } else {
          req.session.message = {
            type: "error",
            text: "Teléfono o identificación incorrectos",
          };
          res.render("index.ejs", { message: req.session.message });
        }
      }
    }
  );
});
module.exports = router;
