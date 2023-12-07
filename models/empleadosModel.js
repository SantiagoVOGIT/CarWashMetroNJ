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
  static async deleteEmpleado(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM empleados WHERE id_empleado = ?";

      db.query(query, [id], (error, results) => {
        if (error) {
          console.error(
            "Error al eliminar el empleado en la base de datos:",
            error
          );
          return reject("Error al eliminar el empleado en la base de datos");
        }
        resolve(results);
      });
    });
  }
  static async addEmpleado(empleado) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO empleados SET ?";

      db.query(query, empleado, (error, results) => {
        if (error) {
          console.error(
            "Error al agregar el empleado a la base de datos:",
            error
          );
          return reject("Error al agregar el empleado a la base de datos");
        }
        resolve(results);
      });
    });
  }
}

module.exports = EmpleadosModel;
