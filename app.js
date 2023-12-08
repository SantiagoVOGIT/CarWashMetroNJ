const express = require("express");
const session = require("express-session");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Configuración del motor de vistas EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Configuración de la carpeta para archivos estáticos
app.use(express.static(__dirname + "/public_html"));

// Middleware para el manejo de datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para el manejo de sesiones
app.use(
  session({
    secret: "Valenciano2005.", // Clave secreta para cifrar las sesiones
    resave: false, // Evitar guardar la sesión si no hay cambios
    saveUninitialized: false, // Evitar guardar sesiones no inicializadas
    cookie: { secure: false }, // Configuración de la cookie de la sesión
  })
);

// Rutas principales
const routes = require("./router/routes");
app.use("/", routes);

// Rutas para usuarios
const userRoutes = require("./router/routesUser");
app.use("/user", userRoutes);

// Rutas para usuarios
const adminRoutes = require("./router/routesAdmin");
app.use("/admin", adminRoutes);

// Middleware para manejar las solicitudes no encontradas (404)
app.use((req, res, next) => {
  res.status(404).render("404.ejs", {
    titulo: "Página no encontrada",
    descripcion: "Página de 404",
  });
});

function formatDateTime(dateTimeString) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateTime = new Date(dateTimeString);
  return new Intl.DateTimeFormat("es-CO", options).format(dateTime);
}

app.locals.formatDateTime = formatDateTime;

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`La aplicación está escuchando en el puerto ${PORT}`);
});
