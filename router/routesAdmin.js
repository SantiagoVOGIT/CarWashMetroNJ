const express = require("express");
const router = express.Router();
const AdminsModel = require("../models/adminsModel");
const CeldasModel = require("../models/celdasModel");

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

module.exports = router;
