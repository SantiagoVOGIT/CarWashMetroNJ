const db = require("../database");

const ReservasModel = {
  createReserva: (reserva, callback) => {
    db.query("INSERT INTO reservas SET ?", reserva, callback);
  },

  getReservasByIdUsuario: (idUsuario) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM reservas WHERE id_usuario = ?",
        [idUsuario],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};

module.exports = ReservasModel;
