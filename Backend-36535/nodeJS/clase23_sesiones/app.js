import express from "express";
import session from "express-session";

const app = express();
const port = 8080;
const server = app.listen(port, () => console.log("Server up on port: ", port));

app.use(express.json());
app.use(
  session({
    secret: "c0d3r",
    cookie: { maxAge: 50000 },
    resave: true,
    saveUninitialized: true,
  })
);

const isAdmin = (req, res, next) => {
  if (req.session.user.rol === "admin") {
    next();
  } else {
    res.send({ message: "No autorizado" });
  }
};

app.get("/connect", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send({
      message: `Hola de nuevo, esta es tu visita ${req.session.counter}`,
    });
  }
  req.session.counter = 1;
  res.send({ message: `Bienvenido, es tu visita ${req.session.counter}` });
});

app.get("/login", (req, res) => {
  let { username, password } = req.query;
  // TODO: consulta a la BD si el usuario existe y ademas si su contraseña es la corecta
  if (username !== "alex" || password !== "coder") {
    return res.send({ message: "Usuario o contraseña incorrectos" });
  }
  req.session.user = { username, rol: "admin" };
  res.send({ message: "Usuario logueado" });
});

app.get("/ruta-secreta", isAdmin, (req, res) => {
  res.send({ message: "Si estas autorizado. Adelante." });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ message: "Logout ERROR", body: err });
    }
    res.send("Logout ok!!");
  });
});
