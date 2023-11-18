const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

// El resto de tu código aquí...

// Configuración de motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Configuración para establecer la carpeta publica para el usuario
app.use(express.static(__dirname + "/public_html"));

// Middleware para el registro
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Recuerda configurar esto a true si estás en un entorno de producción con HTTPS habilitado
  })
);

// Importación de rutas
const routes = require("./router/routes");
app.use("/", routes);

// Plantilla predeterminado en caso de ingresar a una url no existente de la pagina
app.use((req, res, next) => {
  res.status(404).render("404.ejs", {
    titulo: "Página no encontrada",
    descripcion: "pagina de 404",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
