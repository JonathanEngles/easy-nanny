const CoreController = require('./coreController');
const nannyDataMapper = require('../models/nannyDataMapper');


class NannyController extends CoreController {

    static dataMapper = nannyDataMapper;

    constructor() {
        super();
    }

    
};


module.exports = new NannyController();