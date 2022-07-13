require("dotenv").config();
const path = require("path");
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");

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
const messages = require("./src/controllerMensajes"); // Esta persistencia es la que hay que cambiar
const otherMessages = require("./src/controllerMensajesMongo");

app.use("/api/productos-test", router);

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = process.env.PORT || 8080;

httpServer.listen(port, () => console.log(`Server ON, Port: ${port}`));

io.on("connection", async (socket) => {
  console.log("Nueva conexión");

  const productos = await products.getAllProducts();
  socket.emit("productos", productos);

  socket.on("nuevo-producto", async (newProduct) => {
    await products.addProduct(newProduct);
    const productos = await products.getAllProducts();
    io.sockets.emit("productos", productos);
  });

  const mensajes = await messages.getAllMessages();
  socket.emit("mensajes", mensajes);

  socket.on("nuevo-mensaje", async (newMessage) => {
    // await messages.addMessage(newMessage);
    // const mensajes = await messages.getAllMessages();

    const result = await otherMessages.addMessage(newMessage);
    console.log(result); // Este es un mensaje: Nuevo registro agregado
    //io.sockets.emit("mensajes", mensajes);
  });
});
