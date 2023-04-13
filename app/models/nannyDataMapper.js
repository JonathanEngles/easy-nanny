const client = require('../database');
const CoreDataMapper = require('./coreDataMapper');


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

        if (activityData.title && activityData.title.trim() !== '') {
            query += ` "title" = $${index},`;
            values.push(activityData.title);
            index++;
        }

        if (activityData.description && activityData.description.trim() !== '') {
            query += ` "description" = $${index},`;
            values.push(activityData.description);
            index++;
        }

        
        if (activityData.date && activityData.date.trim() !== '') {
            query += ` "date" = $${index},`;
            values.push(activityData.date);
            index++;
        }
        
        if (activityData.begin && activityData.begin.trim() !== '') {
            query += ` "begin" = $${index},`;
            values.push(activityData.begin);
            index++;
        }

        if (activityData.end && activityData.end.trim() !== '') {
            query += ` "end" = $${index},`;
            values.push(activityData.end);
            index++;
        }


        if (activityData.color && activityData.color.trim() !== '') {
            query += ` "color" = $${index},`;
            values.push(activityData.color);
            index++;
        }

        if (activityData.category && activityData.category.trim() !== '') {
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
    };

    async getParentByUniqueId(uniqueId) {

        const result = await client.query('SELECT "id", "nanny_id" FROM "parent" WHERE "uniqueId" = $1', [uniqueId])

        return result.rows[0];
    };

    async updateParent(parentId, nannyId) {
        await client.query('UPDATE "parent" SET "nanny_id" = $1 WHERE "id" = $2', [nannyId, parentId]);
    };

    async updateChildren(parentId, nannyId) {
        await client.query('UPDATE "children" SET "nanny_id" = $1 WHERE "parent_id" = $2', [nannyId, parentId]);
    };
    


async createDiary(date, description, nannyId, parentId) {
    const result =  await client.query(`INSERT INTO "diary" ("date", "description", "nanny_id", "parent_id") VALUES ($1, $2, $3, $4)`, [date, description, nannyId, parentId]);
    return result;
};



async createSuggest(title, parentId, userId) {
    const result =  await client.query(`INSERT INTO "suggest" ("title", "nanny_id", "parent_id") VALUES ($1, $2, $3)`, [title, userId, parentId]);
    return result;
};
};




module.exports = new NannyDataMapper();