//Importador modulo externos
let db = require("./database");
const express = require("express");
const mysql = require("mysql");
const router = require("./router/routes");
const app = express();

//Configuración del server
const port = 3000;

//motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Instanciamiento de la carpeta public
app.use(express.static(__dirname + "/public_html"));

//importación de la configuración de rutas
app.use("/", require("./router/routes"));

//middleware de 404
app.use((req, res, next) => {
  res.status(404).render("404.ejs", {
    titulo: "Página no encontrada",
    descripcion: "pagina de 404",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
