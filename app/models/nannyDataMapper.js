const CoreDataMapper = require('./coreDataMapper');
const client = require('../database');

class NannyDataMapper extends CoreDataMapper {

    static tableName = 'nanny';

    constructor() {
        super();
    }

    async createSuggest(title, parentId, userId) {
        const result =  await client.query(`INSERT INTO "suggest" ("title", "nanny_id", "parent_id") VALUES ($1, $2, $3)`, [title, userId, parentId]);
        return result;
    }
}


module.exports = new NannyDataMapper();