const client = require('../database')

const childDataMapper = {

    async getChildById(childId) {
        const result = await client.query('SELECT "picture", "first_name" FROM children WHERE id = $1', [childId]);
        return result.rows[0];
    },


    async createChildren(name, first_name, sexe, birthday, description, parentId, nannyId, picture) {
        const result = await client.query(`INSERT INTO "children" ("name", "first_name", "sexe", "birthday", "description", "parent_id", "nanny_id",  "picture") VALUES ($1, $2, $3, $4, $5, $6, $7, COALESCE($8, 'children_picture.jpg'))`, [name, first_name, sexe, birthday, description, parentId, nannyId, picture]);
        return result;
    },

    async modifyChildren(id, userId, childrenData) {

        let values = [];
        let index = 1;
        let query = `UPDATE "children" SET`;

        if (childrenData.name && childrenData.name.trim() !== '') {
            query += ` "name" = $${index},`;
            values.push(childrenData.name);
            index++;
        }
        if (childrenData.first_name && childrenData.first_name.trim() !== '') {
            query += ` first_name = $${index},`;
            values.push(childrenData.first_name);
            index++;
        }
        if (childrenData.sexe && childrenData.sexe.trim() !== '') {

            query += ` sexe = $${index},`;
            values.push(childrenData.sexe);
            index++;
        }
        if (childrenData.birthday && childrenData.birthday.trim() !== '') {

            query += ` birthday = $${index},`;
            values.push(childrenData.birthday);
            index++;
        }
        if (childrenData.description && childrenData.description.trim() !== '') {
            query += ` "description" = $${index},`;
            values.push(childrenData.description);
            index++;
        }

        if (childrenData.picture && childrenData.picture.trim() !== '') {
            query += ` picture = $${index},`;
            values.push(childrenData.picture);
            index++;
        }

        query += ` updated_at =$${index},`;
        values.push(`NOW()`);
        index++;

        query = query.slice(0, -1);
        query += ` WHERE id = $${index}`;
        values.push(id);
        index++;

        query += ` AND "parent_id" = $${index}`;
        values.push(userId);


        const result = await client.query(query, values);

        return result;

    },

    async removeChildren(id, userId) {
        const result = await client.query(`DELETE FROM "children" WHERE "id"=$1 AND "parent_id"=$2`, [id, userId]);
        return result;
    }

}
module.exports = childDataMapper;