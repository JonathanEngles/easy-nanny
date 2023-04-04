/**
 * connection to the database using module pg
 */
const { Client } = require('pg');

const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
});


client.connect();


module.exports = client;