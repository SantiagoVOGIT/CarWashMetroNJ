const db = require("../database");

const CeldasModel = {
  getCeldasDisponibles: () => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM celdas WHERE estado_celda = 1",
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

  getCeldas: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM celdas", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  updateEstadoCelda: (celdaId, nuevoEstado) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE celdas SET estado_celda = ? WHERE id_celda = ?",
        [nuevoEstado, celdaId],
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

module.exports = CeldasModel;
