const CoreDataMapper = require('./coreDataMapper');


class ParentDataMapper extends CoreDataMapper {

    static tableName = 'parent';

    constructor() {
        super();
    }
}


module.exports = new ParentDataMapper();