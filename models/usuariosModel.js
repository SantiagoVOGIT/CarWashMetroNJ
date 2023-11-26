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

  // Agregar la función para obtener un usuario por identificación
  getUserByIdentificacion: (identificacion, callback) => {
    db.query(
      "SELECT * FROM Usuarios WHERE identificacion = ?",
      [identificacion],
      callback
    );
  },
};

module.exports = UsuariosModel;
