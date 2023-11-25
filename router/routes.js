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
      res.render("register", {
        message: {
          type: "error",
          text: "Error al registrar el usuario",
        },
      });
    } else {
      vehiculo.id_usuario = userResults.insertId;
      VehiculosModel.createVehiculo(vehiculo, (error, vehiculoResults) => {
        console.log("Vehiculo insertion results:", vehiculoResults);
        if (error) {
          console.log(error);
          res.render("register", {
            message: {
              type: "error",
              text: "Error al registrar el vehículo",
            },
          });
        } else {
          // Se eliminó la asignación a req.session.user aquí
          res.render("register", {
            message: {
              type: "success",
              text: "Registro exitoso, ahora inicia sesión con los datos que ingresaste",
            },
          });
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
        res.render("index.ejs", {
          message: { type: "error", text: "Error al iniciar sesión" },
        });
      } else {
        if (results.length > 0) {
          req.session.user = results[0];
          console.log("Session after login:", req.session);
          res.redirect("/user/home");
        } else {
          res.render("index.ejs", {
            message: {
              type: "error",
              text: "Teléfono o identificación incorrectos",
            },
          });
        }
      }
    }
  );
});

module.exports = router;
