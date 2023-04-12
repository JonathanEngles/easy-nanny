const CoreController = require('./coreController');
const parentDataMapper = require('../models/parentDataMapper');


class ParentController extends CoreController {

    static dataMapper = parentDataMapper;

    constructor() {
        super();
    }
    

    async createSuggest(req, res) {
        try {
            if (req.session && req.session.user) {
                const user = req.session.user;
                const userId = user.id;
                const nannyId = user.nanny_id;
                //get the form with req.body
                const { title } = req.body;
            
                //add user to database
                await parentDataMapper.createSuggest(title, nannyId, userId);
                
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


module.exports = new ParentController();
