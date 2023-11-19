const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public_html"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const routes = require("./router/routes");
app.use("/", routes);

const userRoutes = require("./router/routesUser");
app.use("/user", userRoutes);

app.use((req, res, next) => {
  res.status(404).render("404.ejs", {
    titulo: "Página no encontrada",
    descripcion: "Página de 404",
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
