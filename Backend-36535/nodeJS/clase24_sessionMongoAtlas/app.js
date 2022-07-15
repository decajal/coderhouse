const app = require("./src/server");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server up on port:", port));

const sessionCheck = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect("/dashboard");
    return;
  }
  next();
};

app.get("/", sessionCheck, (req, res) => {
  res.redirect("/login");
});

app.get("/login", sessionCheck, (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { nombre } = req.body;
  req.session.user = { username: nombre };
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.render("dashboard", { userName: req.session.user.username });
  } else {
    res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  if (req.session) {
    const userName = req.session.user.username;
    req.session.destroy(() => {
      req.session = null;
      res.render("logout", { userName });
    });
  }
});
