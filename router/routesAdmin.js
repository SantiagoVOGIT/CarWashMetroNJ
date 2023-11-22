const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard.ejs");
});

router.get("/settings", (req, res) => {
  res.render("admin/settings.ejs");
});

router.get("/staff", (req, res) => {
  res.render("admin/staff.ejs");
});

module.exports = router;
