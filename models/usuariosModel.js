const db = require("../database");

const UsuariosModel = {
  createUser: (usuario, callback) => {
    db.query("INSERT INTO usuarios SET ?", usuario, callback);
  },

  getUserByTelefonoIdentificacion: (telefono, identificacion, callback) => {
    db.query(
      "SELECT * FROM usuarios WHERE telefono = ? AND identificacion = ?",
      [telefono, identificacion],
      callback
    );
  },

  //  función para obtener un usuario por identificación
  getUserByIdentificacion: (identificacion, callback) => {
    db.query(
      "SELECT * FROM usuarios WHERE identificacion = ?",
      [identificacion],
      callback
    );
  },
  getAllUsers: (callback) => {
    db.query("SELECT * FROM usuarios", callback);
  },
};

module.exports = UsuariosModel;
