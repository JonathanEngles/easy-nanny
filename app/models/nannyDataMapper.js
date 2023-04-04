const CoreDataMapper = require('./coreDataMapper');


class NannyDataMapper extends CoreDataMapper {

    static tableName = 'nanny';

    constructor() {
        super();
    }
}


module.exports = new NannyDataMapper();