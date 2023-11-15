const express = require("express");
const router = express.Router();

//Configuración del server
router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.get("/user/home", (req, res) => {
  res.render("user/home", {});
});

module.exports = router;
