const db = require("../database");

const ReservasModel = {
  createReserva: (reserva, callback) => {
    db.query("INSERT INTO reservas SET ?", reserva, callback);
  },

  getReservasByIdUsuario: (idUsuario) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM reservas WHERE id_usuario = ? AND estado_reserva IN (?, ?, ?, ?)",
        [idUsuario, "Cancelada", "Rechazada", "Aceptada", "Pendiente"],
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

  getReservasByIdUsuarioAll: (idUsuario) => {
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

  cancelarReserva: (idReserva) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE reservas SET estado_reserva = 'Cancelada' WHERE id_reserva = ?",
        [idReserva],
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
  getAllReservas: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT r.*, u.nombre, u.apellido
        FROM reservas r
        JOIN usuarios u ON r.id_usuario = u.id_usuario
      `,
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
  updateReservaStatus: (idReserva, estado) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE reservas SET estado_reserva = ? WHERE id_reserva = ?",
        [estado, idReserva],
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
