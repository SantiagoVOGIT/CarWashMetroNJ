const express = require("express");
const router = express.Router();
const AdminsModel = require("../models/adminsModel");

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
          req.session.admin = admin;
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

router.get("/dashboard", (req, res) => {
  if (req.session.admin) {
    res.render("admin/dashboard.ejs");
  } else {
    res.redirect("/");
  }
});

router.get("/settings", (req, res) => {
  if (req.session.admin) {
    res.render("admin/settings.ejs");
  } else {
    res.redirect("/");
  }
});

router.get("/staff", (req, res) => {
  if (req.session.admin) {
    res.render("admin/staff.ejs");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
