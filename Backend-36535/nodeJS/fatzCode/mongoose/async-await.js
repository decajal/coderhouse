require("./connection");
const Product = require("./models/Product");

async function main() {
  const newProduct = new Product({
    name: "keyboard",
    description:
      "K2 V2 HOT SWAPPABLE RGB BACKLIGHT GATERON G PRO MECHANICAL BROWN SWITCH",
    price: 80,
  });

  const productSaved = await newProduct.save();
  return productSaved;
}

main()
  .then((productSaved) => console.log(productSaved))
  .catch((err) => console.log(err));
