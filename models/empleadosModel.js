const db = require("../database");

class EmpleadosModel {
  // Otras funciones del modelo...

  static async getAllEmpleados() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM empleados";

      db.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }
}

module.exports = EmpleadosModel;
