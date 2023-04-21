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
                const nannyId = user.nanny_id;
                //get the form with req.body
                const { title } = req.body;
            
                //add suggest to database
                await parentDataMapper.createSuggest(title, nannyId, user);
                
                res.redirect('/parent/dashboard');
            } else {
                res.redirect('/');
            }
        
    }


    async getParentDashboard(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const user = req.session.user;
            const nannyId = user.nanny_id;

            const activity = await parentDataMapper.getAllActivity(nannyId);
            const children = await parentDataMapper.getAllChildren(user.id);
            const nanny = await parentDataMapper.getNannyById(nannyId);
            const suggest = await parentDataMapper.getSuggests(user.id)
            const diary = await parentDataMapper.getLastDiary(user.id);

            res.render('parentDashboard', { user, activity, children, nanny, suggest, diary });

     } else {
        return res.render('homePage', {error: `pas d'utilisateurs connectés`});
}

    }

    async getParentProfile (req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const user = req.session.user;
            const nannyId = user.nanny_id;

            const children = await parentDataMapper.getAllChildren(user.id);
            const nanny = await parentDataMapper.getNannyById(nannyId);

            res.render('parentProfile', { user, children, nanny });
    } else {
        return res.render('homePage', {error: `pas d'utilisateurs connectés`});
}
    }

    async getParentSuggests(req, res) {
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const user = req.session.user;

            const suggests = await parentDataMapper.getAllSuggests(user.id);

            res.render('parentSuggests', { user, suggests });
    } else {
        return res.render('homePage', {error: `pas d'utilisateurs connectés`});
}
}
async getParentDiaries(req, res) {
    if (req.session && req.session.user && !req.session.user.is_nanny) {
        const user = req.session.user;
        const diaries = await parentDataMapper.getAllDiaries(user.id);
        res.render('parentDiaries', { user, diaries });
    } else {
        return res.render('homePage', {error: `pas d'utilisateurs connectés`});
}
}

};


module.exports = new ParentController();
