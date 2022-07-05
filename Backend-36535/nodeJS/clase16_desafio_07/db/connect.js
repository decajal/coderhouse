const path = require('path');
const dbName = 'ecommerce.db3';
const dbFullName = path.join(__dirname, dbName);

const db = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbFullName,
    },
    useNullAsDefault: true,
});

module.exports = db;