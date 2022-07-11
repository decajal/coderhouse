const { tableExists, getAll, createTable, addRecord } = require('./repoMensajes');

const getAllMessages = async () =>
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

const addMessage = async (newMessage) =>
{
    try {
        
        const exists = await tableExists();
        if (!exists) await createTable();
        await addRecord(newMessage);

        return 'Nuevo mensaje agregado';
    } catch (error) { throw error; }
}

module.exports = { getAllMessages, addMessage }