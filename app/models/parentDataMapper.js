const CoreDataMapper = require('./coreDataMapper');
const client = require ('../database')

class ParentDataMapper extends CoreDataMapper {

    static tableName = 'parent';

    constructor() {
        super();
    }

}


module.exports = new ParentDataMapper();