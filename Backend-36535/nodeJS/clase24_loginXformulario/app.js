require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, "public"))); // si la comento no me permite entrar en las paginas usando la url directamente al html
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "c0d3r",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30000 }, // 30 segundos
  })
);

app.listen(port, () => console.log(`Server ON, Port: ${port}`));

let users = [];

const sessionChecker = (req, res, next) => {
  if (req.cookies.user_sid && req.session.user) {
    res.redirect("/dashboard");
    return;
  }
  next();
};

app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});

app.get("/login", sessionChecker, (req, res) => {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const userExist = users.find((e) => e.username === username);
  if (!userExist) return res.redirect("/login"); // El usuario no existe

  if (userExist.password !== password) return res.redirect("/login"); // La contraseña ingresada no coincide

  req.session.user = { username: userExist.username, email: userExist.email }; // registra usuario en session
  res.redirect("/dashboard");
});

app.get("/signup", sessionChecker, (req, res) => {
  res.sendFile(path.join(__dirname, "public/signup.html"));
});

app.post("/signup", (req, res) => {
  const { email, username, password } = req.body;
  const userExist = users.find((e) => e.username === username);
  if (userExist) return res.send({ message: "El usuario ya existe !" });
  const newUser = {
    email,
    username,
    password,
  };
  users.push(newUser); // persistencia en memoria
  res.redirect("/login");
});

app.get("/dashboard", (req, res) => {
  if (req.cookies.user_sid && req.session.user) {
    res.sendFile(path.join(__dirname, "public/dashboard.html"));
  } else {
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      req.session = null;
      res.redirect("/");
    });
  }
});
