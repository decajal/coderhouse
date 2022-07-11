const db = require('../db/connect');
const tabla = 'productos';

const tableExists = async () =>
{
    const exists = await db.schema.hasTable(tabla);
    return exists;
}

const createTable = async () =>
{
    try {
        await db.schema.createTable(tabla, table =>
            {
                table.increments();
                table.text('title', 255);
                table.real('price');
                table.text('thumbnail', 255);
                table.text('fecha', 255);
            });            
    } catch (error) { throw error; }
}

const addRecord = async (newRecord) =>
{
    try {
        const { title, price, thumbnail } = newRecord;
        const fecha = new Date().toLocaleString();
        await db.insert({ title, price, thumbnail, fecha }).into(tabla);
    } catch (error) { throw error; }
}

const getAll = async () =>
{
    try {
        const data = await db.select().table(tabla);
        return data;
    } catch (error) { throw error; }
}

module.exports = { 
    tableExists,
    createTable, 
    addRecord, 
    getAll }