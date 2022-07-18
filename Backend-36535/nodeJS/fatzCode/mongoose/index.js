require("./connection");
const Product = require("./models/Product");

const newProduct = new Product({
  name: "Laptop",
  description: "Lenovo Thinkpad X1 Carbon 6th Generation",
  price: 1300.99,
});

newProduct.save((err, document) => {
  if (err) console.log(err);
  console.log(document);
});
//console.log(newProduct);
