const client = require('../database');
const CoreDataMapper = require('./coreDataMapper');


class NannyDataMapper extends CoreDataMapper {

    static tableName = 'nanny';

    constructor() {
        super();
    }

    async createDiary(date, description, nannyId, parentId) {
        const result =  await client.query(`INSERT INTO "diary" ("date", "description", "nanny_id", "parent_id") VALUES ($1, $2, $3, $4)`, [date, description, nannyId, parentId]);
        return result;
    }
}


module.exports = new NannyDataMapper();