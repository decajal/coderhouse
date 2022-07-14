require("dotenv").config();
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const storeMongo = require("connect-mongo");
const { engine } = require("express-handlebars");
const User = require("./models/User");

//const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configuración de express-handlebars
app.engine(
  "hbs",
  engine({
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "index",
    extname: ".hbs",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(cookieParser());
//const uri = process.env.MONGO_URI + "/" + process.env.MONGO_COLLECTION;
const uri = process.env.MONGO_ATLAS;
app.use(
  session({
    store: storeMongo.create({
      mongoUrl: uri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    key: "user_sid",
    secret: "c0d3r",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30000 }, // 30 segundos
  })
);

app.listen(process.env.PORT, () =>
  console.log(`Server ON, Port: ${process.env.PORT}`)
);

//let users = [];

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
  res.render("login", { title: "Login de Usuario" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userExist = await User.findOne({ username: username });
  //const userExist = users.find((e) => e.username === username);
  if (!userExist) return res.redirect("/login"); // El usuario no existe

  //if (userExist.password !== password) return res.redirect("/login"); // La contraseña ingresada no coincide
  const result = userExist.comparePWD(password, userExist.password);
  if (!result) return res.redirect("/login"); // La contraseña ingresada no coincide

  req.session.user = { username: userExist.username, email: userExist.email }; // registra usuario en session
  res.redirect("/dashboard");
});

app.get("/signup", sessionChecker, (req, res) => {
  res.render("signup", { title: "Registro de Usuarios" });
});

app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  const userExist = await User.findOne({ username: username });
  //const userExist = users.find((e) => e.username === username);
  if (userExist) return res.send({ message: "El usuario ya existe !" });
  // const newUser = {
  //   username,
  //   password,
  //   email,
  // };
  //users.push(newUser); // persistencia en memoria
  let newUser = new User({
    username: username,
    password: password,
    email: email,
  });
  newUser.save((err, doc) => {
    if (err) {
      //console.log(err);
      res.redirect("/signup");
    } else res.redirect("/login");
  });
});

app.get("/dashboard", (req, res) => {
  if (req.cookies.user_sid && req.session.user) {
    res.render("dashboard", {
      title: "Dashboard del usuario",
      userName: req.session.user.username,
      email: req.session.user.email,
    });
  } else res.redirect("/login");
});

app.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      req.session = null;
      res.redirect("/");
    });
  }
});
