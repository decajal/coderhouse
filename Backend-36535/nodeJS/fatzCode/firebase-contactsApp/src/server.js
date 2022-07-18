require("dotenv/config");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

const app = express();
// settings
app.set("port", process.env.PORT || 8080);
// Handlebars
app.engine(
  "hbs",
  engine({
    layoutsDir: path.join(__dirname, "views/layouts"),
    defaultLayout: "index",
    extname: "hbs",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // con extended: false le decimos que solamente recibimos datos en formato JSON, nada de imagenes ni otra cosa
// routes
app.use(require("./routes/router"));
// static files
app.use(express.static(path.join(__dirname, "static")));

module.exports = app;
