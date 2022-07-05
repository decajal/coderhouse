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
                table.text('autor', 255);
                table.text('mensaje', 255);
                table.text('fecha', 255);
            });            
    } catch (error) { throw error; }
}

const addRecord = async (newRecord) =>
{
    try {
        const { autor, mensaje } = newRecord;
        const fecha = new Date().toLocaleString();
        await db.insert({ autor, mensaje, fecha }).into(tabla);
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