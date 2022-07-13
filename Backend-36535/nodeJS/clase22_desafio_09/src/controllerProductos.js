const { faker } = require("@faker-js/faker");

const {
  tableExists,
  getAll,
  createTable,
  addRecord,
} = require("./repoProductos");

faker.locale = "es";
const getAllProducts = async () => {
  try {
    const exists = await tableExists();
    if (exists) {
      const data = await getAll();
      return data;
    } else {
      await createTable();
      return "No hay mensajes que mostar";
    }
  } catch (error) {
    throw error;
  }
};

const addProduct = async (newProduct) => {
  try {
    const exists = await tableExists();
    if (!exists) await createTable();
    await addRecord(newProduct);

    return "Nuevo mensaje agregado";
  } catch (error) {
    throw error;
  }
};

const generateProducts = (req, res) => {
  const productos = [];

  for (let index = 0; index < 5; index++) {
    const randomProduct = {
      id: index + 1,
      title: faker.commerce.product(),
      price: faker.commerce.price(1, 5000),
      thumbnail: faker.image.business(),
    };
    productos.push(randomProduct);
  }
  res.render("tabla", { productos, tieneElementos: true });
};

module.exports = { getAllProducts, addProduct, generateProducts };
