const CoreDataMapper = require('./coreDataMapper');
const client = require('../database')

class NannyDataMapper extends CoreDataMapper {

    static tableName = 'nanny';

    constructor() {
        super();
    };

    async createActivity(title, description, date, begin, end, color, category, userId) {
        const result =  await client.query(`INSERT INTO "activity" ("title", "description", "date", "begin", "end", "color", "category", "nanny_id") VALUES ($1, $2, $3, $4, $5, CASE WHEN $6 = '' OR $6 IS NULL THEN 'FFFFFF' ELSE $6 END, $7, $8)`, [title, description, date, begin, end, color, category, userId]);
        return result.rows[0];
    };

    async modifyActivity(activityId, userId, activityData) {

        let values = [];
        let index = 1;
        let query = `UPDATE "activity" SET`;

        if (activityData.title) {
            query += ` "title" = $${index},`;
            values.push(activityData.title);
            index++;
        }

        if (activityData.description) {
            query += ` "description" = $${index},`;
            values.push(activityData.description);
            index++;
        }

        
        if (activityData.date) {
            query += ` "date" = $${index},`;
            values.push(activityData.date);
            index++;
        }
        
        if (activityData.begin) {
            query += ` "begin" = $${index},`;
            values.push(activityData.begin);
            index++;
        }

        if (activityData.end) {
            query += ` "end" = $${index},`;
            values.push(activityData.end);
            index++;
        }


        if (activityData.color) {
            query += ` "color" = $${index},`;
            values.push(activityData.color);
            index++;
        }

        if (activityData.category) {
            query += ` "category" = $${index},`;
            values.push(activityData.category);
            index++;
        }

        query += ` "updated_at" = $${index},`;
        values.push(`NOW()`);
        index++;

        query = query.slice(0, -1); 
        query += ` WHERE "id" = $${index}`;
        values.push(activityId);
        index++;

        query += ` AND "nanny_id" = $${index}`;
        values.push(userId);

        const result = await client.query(query, values);
        return result

    };

    async deleteActivity(userId, activityId) {
        await client.query(`DELETE FROM "activity" WHERE "id" = $1 AND "nanny_id" = $2`, [activityId, userId]);
        return;
    }
};



module.exports = new NannyDataMapper();