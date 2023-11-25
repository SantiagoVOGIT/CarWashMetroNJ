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
};

module.exports = CeldasModel;
