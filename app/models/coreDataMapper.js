const client = require('../database');


class CoreDataMapper {

    static tableName;


    async getUserByEmail(email) {
        const tableName = this.constructor.tableName;
        const result = await client.query (`SELECT * FROM "${tableName}" WHERE "email" = $1`, [email]);
        return result.rows[0];
    }


    async createUser(name, first_name, email, password, address, zip_code, city) {
        const tableName = this.constructor.tableName;
        const result =  await client.query(`INSERT INTO "${tableName}" ("name", "first_name", "email", "password", "address", "zip_code", "city") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [name, first_name, email, password, address, zip_code, city]);
        return result.rows[0];
    }
    
    
}



module.exports = CoreDataMapper;
