const { Schema, model } = require("mongoose");
const mensajeCollection = "mensajes";

const mensajeSchema = new Schema({
  author: {
    id: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
      default: 0,
    },
    alias: {
      type: String,
      default: "sin alias",
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = model(mensajeCollection, mensajeSchema);
