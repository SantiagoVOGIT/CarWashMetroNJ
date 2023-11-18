const express = require("express");
const router = express.Router();
// Configuración de rutas get para la interfaz de user

router.get("/user/profile", (req, res) => {
  if (req.session.user) {
    res.render("user/profile.ejs", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});
router.get("/user/home", (req, res) => {
  if (req.session.user) {
    res.render("user/home.ejs", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});
router.get("/user/reservations", (req, res) => {
  if (req.session.user) {
    res.render("user/reservations.ejs", { user: req.session.user });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
