const db = require("../database");

class EmpleadosModel {
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
  static async updateEmpleado(id, newData) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE empleados SET ? WHERE id_empleado = ?";

      db.query(query, [newData, id], (error, results) => {
        if (error) {
          console.error(
            "Error al actualizar el empleado en la base de datos:",
            error
          );
          return reject("Error al actualizar el empleado en la base de datos");
        }
        resolve(results);
      });
    });
  }
}

module.exports = EmpleadosModel;
