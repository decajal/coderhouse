const socket = io();

const formProductos = document.querySelector("#formProductos");
formProductos.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const newProduct = {
    title: data.get("title"),
    price: data.get("price"),
    thumbnail: data.get("thumbnail"),
  };
  socket.emit("nuevo-producto", newProduct);
  formProductos.reset();
});

document.querySelector("#formMensajes").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const newMessage = {
    autor: {
      mail: data.get("mail"),
      nombre: data.get("nombre"),
      apellido: data.get("apellido"),
      edad: data.get("edad"),
      alias: data.get("alias"),
      avatar: data.get("avatar"),
    },
    mensaje: data.get("mensaje"),
  };
  socket.emit("nuevo-mensaje", newMessage);
  document.querySelector("#mensaje").value = "";
});

const renderProductos = async (productos) => {
  const template = await fetch("/layouts/tablaProductos.hbs");
  const textTemplate = await template.text();
  const tieneElementos = productos.length > 0 ? true : false;
  const functionTemplate = Handlebars.compile(textTemplate);
  const html = functionTemplate({ productos, tieneElementos });

  document.querySelector("#divProductos").innerHTML = html;
};

const renderMensajes = async (mensajes) => {
  const template = await fetch("/layouts/listaMensajes.hbs");
  const textTemplate = await template.text();
  const functionTemplate = Handlebars.compile(textTemplate);
  const html = functionTemplate({ mensajes });

  document.querySelector("#divCardBody").innerHTML = html;
};
socket.on("productos", (data) => renderProductos(data));

socket.on("mensajes", (mensajes) => {
  console.log(mensajes);

  const authorSchema = new normalizr.schema.Entity("authors");
  const messageSchema = new normalizr.schema.Entity(
    "mensajes",
    {
      author: authorSchema,
    },
    { idAttribute: "_id" }
  );
  const global = new normalizr.schema.Entity("global", {
    messages: [messageSchema],
  });

  const chat = normalizr.denormalize(
    mensajes.result,
    global,
    mensajes.entities
  );
  console.log(chat.messages);
  renderMensajes(chat.messages);
});
