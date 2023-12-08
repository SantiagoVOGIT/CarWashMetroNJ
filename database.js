const mysql = require("mysql2");

let con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

con.connect(function (err) {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
    throw err;
  }
  console.log("¡Conectado a la base de datos!");
});

module.exports = con;
