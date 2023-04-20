/**
 * connection to the database using module pg
 */
const { Client } = require('pg');

const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});


client.connect();


module.exports = client;
