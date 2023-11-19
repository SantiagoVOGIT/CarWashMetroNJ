const db = require("../database");

const VehiculosModel = {
  createVehiculo: (vehiculo, callback) => {
    db.query("INSERT INTO Vehiculos SET ?", vehiculo, callback);
  },

  getVehiculoByIdUsuario: (idUsuario, callback) => {
    db.query(
      "SELECT * FROM Vehiculos WHERE id_usuario = ?",
      [idUsuario],
      callback
    );
  },
};

module.exports = VehiculosModel;
