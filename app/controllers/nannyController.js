const CoreController = require('./coreController');
const nannyDataMapper = require('../models/nannyDataMapper');



class NannyController extends CoreController {

    static dataMapper = nannyDataMapper;
    constructor() {
        super();
    }


    logout(req, res) {
        req.session.flash = { success: `Vous avez été bien déconnecté` }
        req.session.destroy();

        return res.redirect('/');
    }
    /**
     * create activity by the nanny
     */
    async createActivity(req, res) {
        //verify if a session exists and if an user is connected and if the user is a nanny
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user
            //get the form with req.body
            const { title, description, date, begin, end, color, category } = req.body;
            const colorValue = color.substring(1)
            //add activity to the database
            await nannyDataMapper.createActivity(title, description, date, begin, end, colorValue, category, user);
            req.session.flash = { success: `Activité ${title} créée avec succès` }
            return res.redirect('/nanny/dashboard')
        } else {
            req.session.flash = { error: `vous devez être conecté` }
            return res.redirect('/')
        }

    }

    /**
     * Modify the activity by the nanny
     */
    async modifyActivity(req, res) {
        //verify if a session exists and if an user is connected and if the user is a nanny
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const userId = req.session.user.id
            //get the form with req.body
            const { id, title, description, date, begin, end, color, category } = req.body;
            const colorValue = color.substring(1)
            //modify the activity in the database
            await nannyDataMapper.modifyActivity(id, userId, { title, description, date, begin, end, colorValue, category });
            req.session.flash = { success: `Activité ${title} modifiée avec succès` }
            return res.redirect('/nanny/dashboard')
        } else {
            req.session.flash = { error: `vous devez être connecté` }
            return res.redirect('/')
        }
    };

    /**
     * delete the activity
     */
    async deleteActivity(req, res) {
        //verify if a session exists and if an user is connected and if the user is a nanny
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const userId = req.session.user.id;
            //get the id of activity by his form
            const activityId = Number(req.params.id);
            //delete the activity in database
            await nannyDataMapper.deleteActivity(userId, activityId);
            req.session.flash = { success: `Activité supprimée avec succès` }
            return res.redirect('/nanny/dashboard');
        } else {
            req.session.flash = { error: `vous devez être connecté` }
            return res.redirect('/')
        }
    };

    /**
     * add the parent and the children to nanny
     */
    async linkAccount(req, res) {
        //verify if a session exists and if an user is connected and if the user is a nanny
        if (req.session && req.session.user && req.session.user.is_nanny) {
            //verify if a session exists and if an user is connected
            const nannyId = req.session.user.id;
            const { uniqueId } = req.body;
            //research if a parent exist with the unique Id
            const parent = await nannyDataMapper.getParentByUniqueId(uniqueId);
            if (!parent) {
                req.session.flash = { error: `Clé de liaison incorrecte` }
                return res.redirect('/nanny/dashboard');
            }
            //verify if the parent hasn't already a nanny
            if (parent.nanny_id === null) {
                const parentId = parent.id;
                await nannyDataMapper.updateFamily(parentId, nannyId);
                req.session.flash = { success: `la famille ${parent.name} est correctement liée` }
                return res.redirect('/nanny/dashboard');
            } else {
                req.session.flash = { error: `Ce parent est déjà lié à une Nounou` }
                return res.redirect('/nanny/dashboard');
            }
        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }
    };

    /**
     * create a Diary by Nanny to one Parent
     */
    async createDiary(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user;
            //get the form with req.body
            const { date, description, parentId } = req.body;

            //add diary to database
            await nannyDataMapper.createDiary(date, description, user, parentId);
            req.session.flash = { success: `Journal de suivi créé avec succès` }
            return res.redirect('/nanny/dashboard');
        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }

    }

    /**
     * add suggest by nanny to one Parent
     */
    async createSuggest(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user;
            //get the form with req.body
            const { title, parentId } = req.body;

            //add suggest to database
            await nannyDataMapper.createSuggest(title, parentId, user);
            req.session.flash = { success: `Suggestion créée avec succès` }
            res.redirect('/nanny/dashboard');
        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }
    }


    async getNannyDashboard(req, res) {
        //verify if a session exists and if a Nanny is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user;


            // const activity = await nannyDataMapper.getAllActivity(user.id);
            const children = await nannyDataMapper.getAllChildren(user.id);
            const parents = await nannyDataMapper.getAllParents(user.id);
            const suggests = await nannyDataMapper.getSuggests(user.id);


            res.render('nannyDashboard', { user, children, parents, suggests });

        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }

    }

    //     async getNannyProfile(req, res) {
    //         //verify if a session exists and if a Nanny is connected
    //         if (req.session && req.session.user && req.session.user.is_nanny) {
    //             const user = req.session.user;
    //             const children = await nannyDataMapper.getAllChildren(user.id);
    //             const parent = await nannyDataMapper.getAllParents(user.id);


    //     return res.render('nannyProfile', { children, parent, user, error });

    // } else {

    //     req.session.flash = {error:`Vous devez être connecté`}
    //     return res.redirect('/');
    // }

    //     }

    async getNannySuggests(req, res) {
        //verify if a session exists and if a Nanny is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user;


            const suggests = await nannyDataMapper.getAllSuggests(user.id)

            return res.render('nannySuggests', { suggests, user });
        } else {

            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }
    }


    async getNannyDiaries(req, res) {
        //verify if a session exists and if a Nanny is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user;

            const diaries = await nannyDataMapper.getAllDiaries(user.id);

            // if (!diaries) {
            //     diaries = [];
            //   };
            return res.render('nannyDiaries', { user, diaries });
        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }
    }


    async getNannyActivity(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user;

            const activities = await nannyDataMapper.getAllActivity(user.id);


            return res.json(activities);

        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }

    }



};


module.exports = new NannyController();