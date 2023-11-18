const express = require("express");
const router = express.Router();
const db = require("../database");

// Configuración de ruta get para el registro
router.get("/register", (req, res) => {
  res.render("register.ejs");
});

// Configuración de ruta post para el registro
router.post("/register", (req, res) => {
  const user = {
    identificacion: req.body.identificacion,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
  };

  db.query(
    "SELECT * FROM Usuarios WHERE identificacion = ?",
    [user.identificacion],
    (error, results) => {
      if (error) {
        console.log(error);
        res.render("register", {
          message: { type: "error", text: "Error al registrar el usuario" },
        });
      } else {
        if (results.length > 0) {
          res.render("register", {
            message: {
              type: "error",
              text: "Usuario ya registrado, pruebe con otros datos",
            },
          });
        } else {
          db.query("INSERT INTO Usuarios SET ?", user, (error, results) => {
            if (error) {
              console.log(error);
              res.render("register", {
                message: {
                  type: "error",
                  text: "Error al registrar el usuario",
                },
              });
            } else {
              res.render("register", {
                message: {
                  type: "success",
                  text: "Registro exitoso, ahora inicia sesión con los datos que ingresaste",
                },
              });
            }
          });
        }
      }
    }
  );
});

// Configuración de ruta get para el index (incio de sesión)

router.get("/", (req, res) => {
  res.render("index.ejs");
});

// Configuración de ruta post para el index (incio de sesión)

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
          // Inicio de sesión exitoso
          req.session.user = results[0]; // Guarda el usuario en la sesión
          res.redirect("/user/home"); // Redirige al usuario a la página principal
        } else {
          // Las credenciales no son correctas
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
