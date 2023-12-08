const db = require("../database");

const VehiculosModel = {
  createVehiculo: (vehiculo, callback) => {
    db.query("INSERT INTO vehiculos SET ?", vehiculo, callback);
  },

  getVehiculoByIdUsuario: (idUsuario, callback) => {
    db.query(
      "SELECT * FROM vehiculos WHERE id_usuario = ?",
      [idUsuario],
      callback
    );
  },
};

module.exports = VehiculosModel;
