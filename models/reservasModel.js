const db = require("../database");

const ReservasModel = {
  createReserva: (reserva, callback) => {
    db.query("INSERT INTO reservas SET ?", reserva, callback);
  },
};

module.exports = ReservasModel;
