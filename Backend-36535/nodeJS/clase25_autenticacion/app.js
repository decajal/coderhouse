import express from "express";
import session from "express-session";

const app = express();
const server = app.listen(8080, () => {
  console.log("server up on 8080");
});

let baseSession = session({
  secret: "PruebaCoder",
  resave: false,
  saveUninitialized: false,
});
app.use(baseSession);
app.use(express.json());
app.use(express.static("public"));

let users = [];

app.post("/register", (req, res) => {
  let userExist = users.find((e) => e.username === req.body.username);
  if (userExist) return res.status(400).send({ error: "Usuario ya existe" });
  users.push(req.body);
  res.send({ message: "usuario registrado con exito" });
});

app.post("/login", (req, res) => {
  let { username, password } = req.body;
  let userExist = users.find((e) => e.username === username);
  if (!userExist)
    return res.status(400).send({ error: "Usuario no encontrado" });
  if (userExist.password !== password)
    return res.status(400).send({ error: "Password incorrecto" });

  req.session.user = {
    username: userExist.username,
    address: userExist.address,
  };
  res.send({ message: "Logged In" });
});

app.get("/currentUser", (req, res) => {
  res.send(req.session.user);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send({ error: "error de deslogueo" });
    res.send({ message: "Logged out" });
  });
});
