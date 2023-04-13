const CoreController = require('./coreController');
const parentDataMapper = require('../models/parentDataMapper');


class ParentController extends CoreController {

    static dataMapper = parentDataMapper;

    constructor() {
        super();
    }
    
/**
 * add suggest by parent to his nanny
 * @param {*} req 
 * @param {*} res 
 */
    async createSuggest(req, res) {
       //verify if a session exists and if an user is connected
            if (req.session && req.session.user && !req.session.user.is_nanny && req.session.user.nanny_id) {
                const user = req.session.user;
                const userId = user.id;
                const nannyId = user.nanny_id;
                //get the form with req.body
                const { title } = req.body;
            
                //add suggest to database
                await parentDataMapper.createSuggest(title, nannyId, userId);
                
                res.redirect('/profile');
            } else {
                res.redirect('/');
            }
        
    }

};


module.exports = new ParentController();
