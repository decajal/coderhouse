require("dotenv").config();
const path = require("path");
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const { schema, normalize } = require("normalizr");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "public"));
app.engine(
  "hbs",
  engine({
    defaultLayout: "index.hbs",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

const router = require("./src/routers/routeProductos");
const products = require("./src/controllerProductos");
//const messages = require("./src/controllerMensajes"); // Esta persistencia es la que hay que cambiar
const messagesMongoDB = require("./src/controllerMensajesMongo"); // Mensajes que vienen de mongoDB

// Definiciones de normalizr
const authorSchema = new schema.Entity("author");
const messageSchema = new schema.Entity(
  "mensajes",
  { author: authorSchema },
  { idAttribute: "_id" }
);
const configNormalizr = new schema.Entity("configNormalizr", {
  messages: [messageSchema],
});

app.use("/api/productos-test", router);

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = process.env.PORT || 8080;

httpServer.listen(port, () => console.log(`Server ON, Port: ${port}`));

io.on("connection", async (socket) => {
  console.log("Nueva conexión");

  // a los productos se le manteniene la persistencia como venía
  const productos = await products.getAllProducts();
  socket.emit("productos", productos);

  socket.on("nuevo-producto", async (newProduct) => {
    await products.addProduct(newProduct);
    const productos = await products.getAllProducts();
    io.sockets.emit("productos", productos);
  });

  //const mensajes = await messages.getAllMessages(); // esta es la persistencia anterior
  const dataMongoDB = await messagesMongoDB.getAllMessages();
  // Hay que normalizar 'mensajes'
  const dataMongoDBstringify = JSON.stringify(dataMongoDB);
  const recordToNormalizr = { id: "mensajes", dataMongoDBstringify };
  const messages = normalize(recordToNormalizr, configNormalizr);
  console.log(messages);
  socket.emit("mensajes", messages); // envía los mensajes que están en el servidor

  socket.on("nuevo-mensaje", async (newMessage) => {
    // await messages.addMessage(newMessage);
    // const mensajes = await messages.getAllMessages();

    const result = await messagesMongoDB.addMessage(newMessage); // guarda el nuevo mensaje en mongoDB
    console.log(result); // Este es un mensaje: Nuevo registro agregado
    //io.sockets.emit("mensajes", mensajes);
  });
});
