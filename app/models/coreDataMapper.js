const client = require('../database');

class CoreDataMapper {

    static tableName;

    async getUserById(id) {
        const tableName = this.constructor.tableName
        const result = await client.query(`SELECT * FROM "${tableName}" WHERE "id" = $1`, [id]);
        return result.rows[0];
    }
    async getUserByEmail(email) {
        const tableName = this.constructor.tableName;
        const result = await client.query(`SELECT * FROM "${tableName}" WHERE "email" = $1`, [email]);
        return result.rows[0];
    }


    async createUser(name, first_name, email, password, address, zip_code, city, picture, uniqueId) {
        const tableName = this.constructor.tableName;
        const result = await client.query(`INSERT INTO "${tableName}" ("name", "first_name", "email", "password", "address", "zip_code", "city", "picture", "uniqueId") VALUES ($1, $2, $3, $4, $5, $6, $7, CASE WHEN $8 = '' OR $8 IS NULL THEN '${tableName}_picture.jpg' ELSE $8 END, $9)`, [name, first_name, email, password, address, zip_code, city, picture, uniqueId]);
        return result.rows[0];
    }

    async getChildren(userID) {
        const tableName = this.constructor.tableName;
        const result = await client.query(`SELECT * FROM "children" WHERE ${tableName}_id = $1`
            , [userID]);
        return result.rows
    }


    async updateProfile(userId, profileData) {
        const tableName = this.constructor.tableName;

        let values = [];
        let index = 1;
        let query = `UPDATE ${tableName} SET`;

        if (profileData.name && profileData.name.trim() !== '') {
            query += ` "name" = $${index},`;
            values.push(profileData.name);
            index++;
        }
        if (profileData.first_name && profileData.first_name.trim() !== '') {
            query += ` first_name = $${index},`;
            values.push(profileData.first_name);
            index++;
        }
        if (profileData.email && profileData.email.trim() !== '') {

            query += ` email = $${index},`;
            values.push(profileData.email);
            index++;
        }
        if (profileData._password && profileData._password.trim() !== '') {

            query += ` password = $${index},`;
            values.push(profileData._password);
            index++;
        }
        if (profileData.address && profileData.address.trim() !== '') {
            query += ` address = $${index},`;
            values.push(profileData.address);
            index++;
        }
        if (profileData.zip_code && profileData.zip_code.trim() !== '') {
            query += ` zip_code = $${index},`;
            values.push(profileData.zip_code);
            index++;
        }
        if (profileData.city && profileData.city.trim() !== '') {
            query += ` city = $${index},`;
            values.push(profileData.city);
            index++;
        }
        if (profileData.picture && profileData.picture.trim() !== '') {
            query += ` picture = $${index},`;
            values.push(profileData.picture);
            index++;
        }

        query += ` updated_at =$${index},`;
        values.push(`NOW()`);
        index++;

        query = query.slice(0, -1);
        query += ` WHERE id = $${index}`;
        values.push(userId);


        const result = await client.query(query, values);

        return result;

    }


    async deleteProfile(id) {
        const tableName = this.constructor.tableName;
        await client.query(`DELETE FROM ${tableName} WHERE id =$1`, [id]);
        return;
    }



}



module.exports = CoreDataMapper;
