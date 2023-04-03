const client = require('../database');

const dataMapper = {
async getEmail(email) {
    
    const result = await client.query ('SELECT email FROM parent WHERE email = $1', [email]);

    return result.rowCount;

},


 addParent(name, first_name, email, password, address, zip_code, city) {
    
    const newParent =  client.query('INSERT INTO "parent" ("name", "first_name", "email", "password", "address", "zip_code", "city") VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, first_name, email, password, address, zip_code, city]);
    return newParent;
    
},
}

module.exports = dataMapper;