let mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "carwashmetro_db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("¡Conectado a la base de datos!");
});

module.exports = con;
