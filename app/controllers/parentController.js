const CoreController = require('./coreController');
const parentDataMapper = require('../models/parentDataMapper');



class ParentController extends CoreController {

    static dataMapper = parentDataMapper;

    constructor() {
        super();
    }

    /**
     * add suggest by parent to his nanny
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

            req.session.flash = { success: `Suggestion créée avec succès` }
            return res.redirect('/parent/dashboard');
        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }

    }


    async getParentDashboard(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const user = req.session.user;
            const nannyId = user.nanny_id;

            // const activities = await parentDataMapper.getAllActivity(nannyId);
            const children = await parentDataMapper.getAllChildrenAndNanny(user.id);
            const nanny = await parentDataMapper.getNannyById(nannyId);
            const suggests = await parentDataMapper.getSuggests(user.id)
            // const diary = await parentDataMapper.getLastDiary(user.id);

            // , activity, children, nanny, suggest, diary 
            return res.render('parentDashboard', { user, children, nanny, suggests });

        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }

    }


    async getParentActivity(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const user = req.session.user;
            const nannyId = user.nanny_id;

            const activities = await parentDataMapper.getAllActivity(nannyId);


            return res.json(activities);

        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }

    }

    //     async getParentProfile (req, res) {
    //verify if a session exists and if an user is connected
    //         if (req.session && req.session.user && !req.session.user.is_nanny) {
    //             const user = req.session.user;
    //             const nannyId = user.nanny_id;

    //             const children = await parentDataMapper.getAllChildren(user.id);
    //             const nanny = await parentDataMapper.getNannyById(nannyId);

    //             res.render('parentProfile', { user, children, nanny });
    //     } else {
    //         req.session.flash = {error:`Vous devez être connecté`}
    //                 return res.redirect('/');
    // }
    //     }

    async getParentSuggests(req, res) {
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const user = req.session.user;

            const suggests = await parentDataMapper.getAllSuggests(user.id);

            return res.render('parentSuggests', { user, suggests });
        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }
    }
    async getParentDiaries(req, res) {
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const user = req.session.user;
            const diaries = await parentDataMapper.getAllDiaries(user.id);

            return res.render('parentDiaries', { user, diaries });
        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }
    }

};


module.exports = new ParentController();
