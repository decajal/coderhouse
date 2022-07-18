const User = require("../models/User");

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("dashboard", { userName: req.user.nombre });
  }
  res.render("login");
};

const getFailLogin = (req, res) => {
  res.render("errorLogin");
};

const postLogin = (req, res) => {
  res.render("dashboard", { userName: req.user.nombre });
};

const getSignup = (req, res) => {
  res.render("signup");
};

const postSignup = async (req, res) => {
  const { nombre, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.render("errorSignup", { message: "Usuario ya registrado" });
  }
  let newUser = new User({
    nombre,
    email,
    password,
  });
  newUser.save((err, doc) => {
    if (err) {
      return res.render("errorSignup", {
        message: "Ocurrió un error interno, por favor intente más tarde",
      });
    }
    res.render("successSignup");
  });
};

const getLogout = (req, res) => {
  const userName = req.user.nombre;
  req.logout((err) => {
    if (!err) return res.render("logout", { userName });
  });
};

module.exports = {
  getLogin,
  getFailLogin,
  postLogin,
  getSignup,
  postSignup,
  getLogout,
};
