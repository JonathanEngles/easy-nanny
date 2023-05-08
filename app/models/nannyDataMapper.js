const client = require('../database');
const CoreDataMapper = require('./coreDataMapper');


class NannyDataMapper extends CoreDataMapper {

    static tableName = 'nanny';

    constructor() {
        super();
    };

    async createActivity(title, description, date, begin, end, color, category, nanny) {
        const createdBy = `Nom et prénom : ${nanny.name} ${nanny.first_name}, Email : ${nanny.email}, Adresse : ${nanny.address} ${nanny.zip_code} ${nanny.city}`;
        const result =  await client.query(`INSERT INTO "activity" ("title", "description", "date", "begin", "end", "color", "category", "nanny_id", "created_by") VALUES ($1, $2, $3, $4, $5, COALESCE($6, '379DDD'), $7, $8, $9)`, [title, description, date, begin, end, color, category, nanny.id, createdBy]);
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

        const result = await client.query('SELECT "id", "name", "nanny_id" FROM "parent" WHERE "uniqueId" = $1', [uniqueId])

        return result.rows[0];
    };

    async updateFamily(parentId, nannyId) {
        await client.query('UPDATE "parent" SET "nanny_id" = $1 WHERE "id" = $2', [nannyId, parentId]);
        await client.query('UPDATE "children" SET "nanny_id" = $1 WHERE "parent_id" = $2', [nannyId, parentId]);

        return
    };


async createDiary(date, description, nanny, parentId) {
    const parentResult = await client.query('SELECT * FROM "parent" WHERE "id" = $1', [parentId]);
    const parent = parentResult.rows[0];
    const createdFor = `Nom et prénom : ${parent.name} ${parent.first_name}, Email : ${parent.email}, Adresse : ${parent.adress} ${parent.zip_code} ${parent.city}`;
    const createdBy = `Nom et prénom : ${nanny.name} ${nanny.first_name}, Email : ${nanny.email}, Adresse : ${nanny.address} ${nanny.zip_code} ${nanny.city}`;
        const result =  await client.query(`INSERT INTO "diary" ("date", "description", "nanny_id", "parent_id", "created_by", "created_for") VALUES ($1, $2, $3, $4, $5, $6)`, [date, description, nanny.id, parentId, createdBy, createdFor]);
        return result;
};



async createSuggest(title, parentId, nanny) {

        const parentResult = await client.query('SELECT * FROM "parent" WHERE "id" = $1', [parentId]);
        const parent = parentResult.rows[0];
        const createdFor = `Nom et prénom : ${parent.name} ${parent.first_name}, Email : ${parent.email}, Adresse : ${parent.address} ${parent.zip_code} ${parent.city}`;
        const createdBy = `Nom et prénom : ${nanny.name} ${nanny.first_name}, Email : ${nanny.email}, Adresse : ${nanny.address} ${nanny.zip_code} ${nanny.city}`;
        const result =  await client.query(`INSERT INTO "suggest" ("title", "nanny_id", "parent_id", "created_by", "created_for") VALUES ($1, $2, $3, $4, $5)`, [title, nanny.id, parentId, createdBy, createdFor]);
        return result;

};

async getAllActivity(id) {
    const result = await client.query('SELECT * FROM "activity" WHERE "id" = $1', [id]);
    return result.rows;
};

async getAllChildren(id) {
    const result = await client.query('SELECT * FROM "children" WHERE "id" = $1 ORDER BY "parent_id"', [id]);
    return result.rows;
};

async getAllParents(id) {
    const result = await client.query('SELECT * FROM "parent" WHERE "id" = $1', [id]);
    return result.rows;
};

async getSuggests(id) {
    const result = await client.query('SELECT * FROM "suggest" WHERE "nanny_id" = $1 ORDER BY "created_at" DESC LIMIT 5', [id]);
    return result.rows;
};

async getAllSuggests(id) {
    const result = await client.query('SELECT * FROM "suggest" WHERE "nanny_id" = $1 ORDER BY "created_at" DESC', [id]);
    return result.rows;
};

async getAllDiaries(id) {
    const result = await client.query('SELECT * FROM "diary" WHERE "nanny_id" = $1 ORDER BY "created_at" DESC', [id]);
    return result.rows;
};
};




module.exports = new NannyDataMapper();