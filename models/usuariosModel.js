const db = require("../database");

const UsuariosModel = {
  createUser: (usuario, callback) => {
    db.query("INSERT INTO Usuarios SET ?", usuario, callback);
  },

  getUserByTelefonoIdentificacion: (telefono, identificacion, callback) => {
    db.query(
      "SELECT * FROM Usuarios WHERE telefono = ? AND identificacion = ?",
      [telefono, identificacion],
      callback
    );
  },
};

module.exports = UsuariosModel;
