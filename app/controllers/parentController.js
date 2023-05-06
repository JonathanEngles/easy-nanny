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
                
                req.session.flash = {success:`Journal de suivi créé avec succès`}
                res.redirect('/parent/dashboard');
            } else {
                req.session.flash = {error:`Vous devez être connecté`}
                return res.redirect('/');
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
        req.session.flash = {error:`Vous devez être connecté`}
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

            res.render('parentSuggests', { user, suggests });
    } else {
        req.session.flash = {error:`Vous devez être connecté`}
                return res.redirect('/');
}
}
async getParentDiaries(req, res) {
    if (req.session && req.session.user && !req.session.user.is_nanny) {
        const user = req.session.user;
        const diaries = await parentDataMapper.getAllDiaries(user.id);

        res.render('parentDiaries', { user, diaries });
    } else {
        req.session.flash = {error:`Vous devez être connecté`}
                return res.redirect('/');
}
}

};


module.exports = new ParentController();
