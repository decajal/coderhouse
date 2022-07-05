const db = require('../db/connect');
const tablaMensajes = 'mensajes';

const tableExists = async () =>
{
    const exists = await db.schema.hasTable(tablaMensajes);
    return exists;
}

const createTable = async () =>
{
    try {
        await db.schema.createTable(tablaMensajes, table =>
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
        await db.insert({ autor, mensaje, fecha }).into(tablaMensajes);
    } catch (error) { throw error; }
}

const getAll = async () =>
{
    try {
        const data = await db.select().table(tablaMensajes);
        return data;
    } catch (error) { throw error; }
}

module.exports = { tableExists, createTable, addRecord, getAll }