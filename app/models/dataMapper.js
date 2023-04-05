const client = require('../database');

const dataMapper = {
async getEmail(email) {
    
    const result = await client.query ('SELECT "email" FROM parent WHERE email = $1', [email]);

    return result.rows;

},


 addParent(name, first_name, email, password, address, zip_code, city) {
    
    const result =  client.query('INSERT INTO "parent" ("name", "first_name", "email", "password", "address", "zip_code", "city") VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, first_name, email, password, address, zip_code, city]);
    return result;
    
},

async getParent(email) {
    
    const result = await client.query ('SELECT * FROM parent WHERE email = $1', [email]);
    return result.rows[0];

},
// same function but concern nanny only
async getEmailNanny(email) {
    
    const result = await client.query ('SELECT email FROM "nanny" WHERE email = $1', [email]);

    return result.rowCount;

},

addNanny(name, first_name, email, password, address, zip_code, city) {
    
    const result =  client.query('INSERT INTO "nanny" ("name", "first_name", "email", "password", "address", "zip_code", "city") VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, first_name, email, password, address, zip_code, city]);
    return result;
    
},


async getNanny(email) {
    
    const result = await client.query ('SELECT * FROM "nanny" WHERE email = $1', [email]);
    return result.rows[0];

},



}

module.exports = dataMapper;