const CoreController = require('./coreController');
const parentDataMapper = require('../models/parentDataMapper');


class ParentController extends CoreController {

    static dataMapper = parentDataMapper;

    constructor() {
        super();
    }
    async deleteProfile(req, res) {
        if (req.session && req.session.user) {
            const user = req.session.user;
            await this.constructor.dataMapper.deleteProfile(user.id);
            return res.render('homePage');
    }}

};


module.exports = new ParentController();
