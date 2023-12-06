const db = require("../database");

const AdminsModel = {
  createAdmin: (admin, callback) => {
    db.query("INSERT INTO admins SET ?", admin, callback);
  },

  getAdminByCorreoContrasena: (correo, contrasena, callback) => {
    db.query(
      "SELECT * FROM admins WHERE correo = ? AND contrasena = ?",
      [correo, contrasena],
      callback
    );
  },

  getAllAdmins: (callback) => {
    db.query("SELECT * FROM admins", callback);
  },
};

module.exports = AdminsModel;
