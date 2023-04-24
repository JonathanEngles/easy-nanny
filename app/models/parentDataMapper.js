const CoreDataMapper = require('./coreDataMapper');

const client = require ('../database')


class ParentDataMapper extends CoreDataMapper {

    static tableName = 'parent';

    constructor() {
        super();
    };

    async createSuggest(title, nannyId, parent) {
        const nannyResult = await client.query('SELECT * FROM "nanny" WHERE "id" = $1', [nannyId]);
        const nanny = nannyResult.rows[0];
        const createdFor = `Nom et prénom : ${nanny.name} ${nanny.first_name}, Email : ${nanny.email}, Adresse : ${nanny.address} ${nanny.zip_code} ${nanny.city}`;
        const createdBy = `Nom et prénom : ${parent.name} ${parent.first_name}, Email : ${parent.email}, Adresse : ${parent.address} ${parent.zip_code} ${parent.city}`;
        const result =  await client.query(`INSERT INTO "suggest" ("title", "nanny_id", "parent_id", "created_by", "created_for") VALUES ($1, $2, $3, $4, $5)`, [title, nannyId, parent.id, createdBy, createdFor]);
        return result.rows;
    };

    async getAllActivity (nannyId) {

        const result = await client.query('SELECT * FROM "activity" WHERE "nanny_id" = $1', [nannyId]);
        return result.rows;
    };

    async getAllChildren (id) {
        const result = await client.query('SELECT * FROM "children" WHERE "parent_id" = $1', [id]);
        return result.rows;
    };

    async getNannyById(id) {
        const result = await client.query('SELECT * FROM "nanny" WHERE "id" = $1', [id]);
        return result.rows[0];
    };

    async getSuggests(id) {
        const result = await client.query('SELECT * FROM "suggest" WHERE "parent_id" = $1 ORDER BY "created_at" DESC LIMIT 5', [id]);
        return result.rows;
    };

    async getAllSuggests(id) {
        const result = await client.query('SELECT * FROM "suggest" WHERE "parent_id" = $1 ORDER BY "created_at" DESC', [id]);
        return result.rows;
    };

  async  getLastDiary(id) {
        const result = await client.query(`SELECT "date", "description", to_char(Date, 'TMDay DD TMMonth YYYY') FROM "diary" WHERE "parent_id" = $1 ORDER BY "created_at" DESC LIMIT 1;`, [id]);
        return result.rows[0];
    }
    
    async getAllDiaries(id) {
        const result = await client.query(`SELECT *, to_char(Date, 'TMDay DD TMMonth YYYY') FROM "diary" WHERE "parent_id" = $1 ORDER BY "created_at" DESC`, [id]);
        return result.rows;
    };

};


module.exports = new ParentDataMapper();