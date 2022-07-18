require("../connection");
const Product = require("../models/Product");

const createProducts = async () => {
  const productOne = new Product({
    name: "Laptop HP",
    description: "HP Pavilion 15",
  });
  await productOne.save();

  const productTwo = new Product({
    name: "Laptop Lenovo",
    description: "Lenovo X1",
  });
  await productTwo.save();
};

createProducts();
