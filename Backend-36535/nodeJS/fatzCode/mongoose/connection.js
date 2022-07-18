const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/myEcommerceExample";
const db = mongoose.connection;

mongoose.connect(uri);

db.once("open", () => {
  console.log("Database is conected to", uri); // el ONCE hace que lo escuche una sola vez, durante la conección y nada más
});

db.on("error", (err) => {
  console.log(err);
});
