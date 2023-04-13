const CoreDataMapper = require('./coreDataMapper');

const client = require ('../database')


class ParentDataMapper extends CoreDataMapper {

    static tableName = 'parent';

    constructor() {
        super();
    }

    async createSuggest(title, nannyId, user) {
        const result =  await client.query(`INSERT INTO "suggest" ("title", "nanny_id", "parent_id", "created_by") VALUES ($1, $2, $3, $4)`, [title, nannyId, user.id, user]);
        return result;
    }

}


module.exports = new ParentDataMapper();