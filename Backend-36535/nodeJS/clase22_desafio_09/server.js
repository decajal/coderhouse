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

app.use("/api/productos-test", router);

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = process.env.PORT || 8080;

httpServer.listen(port, () => console.log(`Server ON, Port: ${port}`));

const getDataNormalized = (data_to_normalize) => {
  const messages = JSON.parse(JSON.stringify(data_to_normalize));
  const authorSchema = new schema.Entity("authors");
  const messageSchema = new schema.Entity(
    "mensajes",
    {
      author: authorSchema,
    },
    { idAttribute: "_id" }
  );
  const global = new schema.Entity("global", {
    messages: [messageSchema],
  });
  const data = { id: "mensajes", messages };
  const dataNormalized = normalize(data, global);

  return dataNormalized;
};

io.on("connection", async (socket) => {
  console.log("Nueva conexión");

  // A los productos se le manteniene la persistencia como venía
  const productos = await products.getAllProducts();
  socket.emit("productos", productos);

  socket.on("nuevo-producto", async (newProduct) => {
    await products.addProduct(newProduct);
    const productos = await products.getAllProducts();
    io.sockets.emit("productos", productos);
  });

  const dataMongoDB = await messagesMongoDB.getAllMessages();
  const dataNormalizr = getDataNormalized(dataMongoDB);
  socket.emit("mensajes", dataNormalizr);

  socket.on("nuevo-mensaje", async (newMessage) => {
    await messagesMongoDB.addMessage(newMessage);
    const dataMongoDB = await messagesMongoDB.getAllMessages();
    const dataNormalizr = getDataNormalized(dataMongoDB);
    io.sockets.emit("mensajes", dataNormalizr);
  });
});
