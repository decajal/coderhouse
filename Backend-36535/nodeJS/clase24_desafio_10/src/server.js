require("dotenv/config");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const storeMongo = require("connect-mongo");
const { engine } = require("express-handlebars");

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.engine(
  "hbs",
  engine({
    layoutsDir: path.join(__dirname, "../views/layouts"),
    defaultLayout: "index",
    extname: ".hbs",
  })
);
server.set("views", path.join(__dirname, "../views"));
server.set("view engine", "hbs");

server.use(cookieParser());
const uri = process.env.MONGO_ATLAS;
server.use(
  session({
    store: storeMongo.create({
      mongoUrl: uri,
      ttl: 10 * 60, // Esto creo que son los 10 minutos del enunciado
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    key: "user_sid",
    secret: "c0d3R",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }, // 60 segundos: 1 minto para la cookie local
  })
);

module.exports = server;
