require("./mongoDB/connect");
const Mensaje = require("./mongoDB/models/Mensaje");

const getAllMessages = async () => {
  const mensajes = await Mensaje.find();
  return mensajes;
};

const addMessage = async (newRecord) => {
  const { autor, mensaje } = newRecord;
  const newMensaje = new Mensaje({
    author: {
      id: autor.mail,
      nombre: autor.nombre,
      apellido: autor.apellido,
      edad: autor.edad,
      alias: autor.alias,
      avatar: autor.avatar,
    },
    text: mensaje,
  });
  await newMensaje.save();
  return "Nuevo mensaje agregado";
};

module.exports = { addMessage, getAllMessages };
