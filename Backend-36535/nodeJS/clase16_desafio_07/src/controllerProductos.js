const { tableExists, getAll, createTable, addRecord } = require('./repoProductos');

const getAllProducts = async () =>
{
    try {
        const exists = await tableExists();
        if (exists) {
            const data = await getAll();
            return data;
        }
        else {
            await createTable();
            return 'No hay mensajes que mostar';
        }
    } catch (error) { throw error; }
}

const addProduct = async (newProduct) =>
{
    try {
        
        const exists = await tableExists();
        if (!exists) await createTable();
        await addRecord(newProduct);

        return 'Nuevo mensaje agregado';
    } catch (error) { throw error; }
}

module.exports = { getAllProducts, addProduct }