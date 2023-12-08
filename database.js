let mysql = require("mysql");

let con = mysql.createConnection({
  host: process.env.DB_HOST || "sql.freedb.tech",
  user: process.env.DB_USER || "freedb_santivogit",
  password: process.env.DB_PASSWORD || "fjx#6aKmbmCDg6!",
  database: process.env.DB_DATABASE || "freedb_carwashmetro_db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("¡Conectado a la base de datos!");
});

module.exports = con;
