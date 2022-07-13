const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const User = require("./models/User");

const app = express();

const server = app.listen(8080, () => console.log("Server Up"));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "c0d3r",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

app.get("/", sessionChecker, (req, res) => {
  res.redirect("/login");
});

app
  .route("/login")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    const docs = await User.findOne({ username: username });
    const comp = docs.comparePassword(password, docs.password);
    if (comp) {
      req.session.user = docs;
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  });

app
  .route("/signup")
  .get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + "/public/signup.html");
  })
  .post((req, res) => {
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    user.save((err, docs) => {
      console.log(user);
      if (err) {
        console.log(err);
        res.redirect("/signup");
      } else {
        req.session.user = docs;
        res.redirect("/dashboard");
      }
    });
  });

app.get("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.sendFile(__dirname + "/public/dashboard.html");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      req.session = null;
      res.redirect("/");
    });
  }
});
