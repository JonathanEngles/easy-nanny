const CoreController = require('./coreController');
const parentDataMapper = require('../models/parentDataMapper');


class ParentController extends CoreController {

    static dataMapper = parentDataMapper;

    constructor() {
        super();
    }
    

};


module.exports = new ParentController();
