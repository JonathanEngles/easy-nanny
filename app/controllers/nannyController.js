const CoreController = require('./coreController');
const nannyDataMapper = require('../models/nannyDataMapper');


class NannyController extends CoreController {

    static dataMapper = nannyDataMapper;

    constructor() {
        super();
    }

    async createSuggest(req, res) {
        try {
            if (req.session && req.session.user) {
                const userId = req.session.user.id;
                //get the form with req.body
                const { title, parentId } = req.body;
            
                //add user to database
                await nannyDataMapper.createSuggest(title, parentId, userId);
                
                res.redirect('/profile');
            } else {
                throw new Error('User not authenticated');
            }
        } catch (error) {
            console.error('Error :', error);
            res.status(500).send('An error occurred while creating the diary entry');
        }
    }
    
    
};


module.exports = new NannyController();