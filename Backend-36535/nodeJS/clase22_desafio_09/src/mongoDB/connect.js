const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/ecommerce";
const db = mongoose.connection;

mongoose.connect(uri, {
  // si da error borrar esto, en el video que vi no lo usaba
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log("Database is conected to", uri); // el ONCE hace que lo escuche una sola vez, durante la conección y nada más
});

db.on("error", (err) => {
  console.log(err);
});
