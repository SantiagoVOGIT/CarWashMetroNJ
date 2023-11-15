const express = require("express");
const router = express.Router();

router.get("/user/home", (req, res) => {
  res.render("user/home", {});
});
router.get("/user/reservations", (req, res) => {
  res.render("user/home", {});
});
router.get("/user/home", (req, res) => {
  res.render("user/home", {});
});

module.exports = router;
