const CoreController = require('./coreController');
const nannyDataMapper = require('../models/nannyDataMapper');


class NannyController extends CoreController {

    static dataMapper = nannyDataMapper;

    constructor() {
        super();
    }
/**
 * create activity by the nanny
 * @param {*} req 
 * @param {*} res 
 */
    async createActivity (req, res) {
        if (req.session && req.session.user) {
          const userId = req.session.user.id
        const {title, description, date, begin, end, color, category} = req.body;

        await nannyDataMapper.createActivity(title, description, date, begin, end, color, category, userId);
        res.redirect('/dashboard')
        } else {res.redirect('/')
    }

    }

    async modifyActivity(req, res) {
        if (req.session && req.session.user) {
            const userId = req.session.user.id
            const {id, title, description, date, begin, end, color, category} = req.body;
            await nannyDataMapper.modifyActivity(id, userId, {title, description, date, begin, end, color, category});
            res.redirect('/dashboard')
        } else {res.redirect('/')
    }
}
};


module.exports = new NannyController();