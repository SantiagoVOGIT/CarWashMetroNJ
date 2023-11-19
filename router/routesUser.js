const express = require("express");
const router = express.Router();
const VehiculosModel = require("../models/vehiculosModel");

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

router.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("user/home.ejs", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});

router.get("/reservations", (req, res) => {
  if (req.session.user) {
    res.render("user/reservations.ejs", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
