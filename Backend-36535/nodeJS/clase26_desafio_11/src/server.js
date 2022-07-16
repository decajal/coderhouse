require("dotenv/config");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const server = express();

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

module.exports = server;
