const express = require("express");
const session = require("express-session");
const User = require("./models/Users");
//const fileStore = require("session-file-store");

//const Store = fileStore(session); // con esto creamos el store

const app = express();
const server = app.listen(8080, () => console.log("Server up"));

// Esto es la primer parte de la clase donde probamos guardando en el fileStore, ahora trabajaremos sobre mongo
// app.use(
//   session({
//     store: new Store({
//       path: "./sessions",
//       ttl: 60, // session time to live in seconds: 60 segundos
//     }),
//     secret: "c0d3r",
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }, // 60 segundos
//   })
// );

// app.get("/", (req, res) => {
//   req.session.user = {
//     username: "alex",
//     role: "admin",
//   };
//   res.send({ message: "ok" });
// });

// app.get("/currentUser", (req, res) => {
//   res.send(req.session.user);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    key: "user_sid",
    secret: "c0d3r",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);

// ESTO ES UN MIDDLEWARE !! TAL Y CUAL COMO LO DEBERÍAMOS HABER VISTO CON NAVAS
const sessionChequer = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

app.get("/", sessionChequer, (req, res) => {
  res.redirect("/login");
});

app.route("/login").get(sessionChequer, (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app
  .route("/signup")
  .get(sessionChequer, (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
  })
  .post((req, res) => {
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    user.save((err, docs) => {
      if (err) {
        res.redirect("/signup");
      } else {
        req.session.user = docs;
        res.redirect("/dashboard");
      }
    });
  });

app.get("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + "public/dashboard.html");
  } else {
    res.redirect("/login");
  }
});
