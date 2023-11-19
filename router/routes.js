const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Configuración de ruta post para el registro
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

  db.query("INSERT INTO Usuarios SET ?", usuario, (error, userResults) => {
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
      db.query(
        "INSERT INTO Vehiculos SET ?",
        vehiculo,
        (error, vehiculoResults) => {
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
            // Después de insertar el usuario y vehículo en la base de datos
            req.session.user = {
              ...usuario,
              vehiculo: vehiculo, // Aquí añadimos la información del vehículo
            };

            res.render("register", {
              message: {
                type: "success",
                text: "Registro exitoso, ahora inicia sesión con los datos que ingresaste",
              },
            });
          }
        }
      );
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

  db.query(
    "SELECT * FROM Usuarios WHERE telefono = ? AND identificacion = ?",
    [user.telefono, user.identificacion],
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
