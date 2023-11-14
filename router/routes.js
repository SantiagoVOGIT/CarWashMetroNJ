const express = require("express");
const router = express.Router();

//Configuración del server
router.get("/", (req, res) => {
  res.render("index.ejs", { titulo: "inicio EJS" });
});

router.get("/register", (req, res) => {
  res.render("register.ejs", { tituloservicios: "Servicios EJS" });
});

module.exports = router;
