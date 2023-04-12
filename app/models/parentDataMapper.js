const CoreDataMapper = require('./coreDataMapper');

const client = require ('../database')


class ParentDataMapper extends CoreDataMapper {

    static tableName = 'parent';

    constructor() {
        super();
    }

    async createSuggest(title, nannyId, userId) {
        const result =  await client.query(`INSERT INTO "suggest" ("title", "nanny_id", "parent_id") VALUES ($1, $2, $3)`, [title, nannyId, userId]);
        return result;
    }

}


module.exports = new ParentDataMapper();