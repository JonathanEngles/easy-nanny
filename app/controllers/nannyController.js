const CoreController = require('./coreController');
const nannyDataMapper = require('../models/nannyDataMapper');
const { request } = require("express");


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
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
          const userId = req.session.user.id
          //get the form with req.body
        const {title, description, date, begin, end, color, category} = req.body;

            //add activity to the database
        await nannyDataMapper.createActivity(title, description, date, begin, end, color, category, userId);
        res.redirect('/dashboard')
        } else {res.redirect('/')
    }

    }

    /**
     * Modify the activity by the nanny
     * @param {*} req 
     * @param {*} res 
     */
    async modifyActivity(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const userId = req.session.user.id
            //get the form with req.body
            const {id, title, description, date, begin, end, color, category} = req.body;
            //modify the activity in the database
            await nannyDataMapper.modifyActivity(id, userId, {title, description, date, begin, end, color, category});
            res.redirect('/dashboard')
        } else {res.redirect('/')
    }
};

/**
 * delete the activity
 * @param {*} req 
 * @param {*} res 
 */
    async deleteActivity(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const userId = req.session.user.id;
            //get the id of activity by his form
            const activityId = req.body.id;

            //delete the activity in database
            await nannyDataMapper.deleteActivity(userId, activityId);
            res.redirect('/dashboard');
        } else {
            res.redirect('/')
    }
    };

    /**
     * add the parent and the children to nanny
     * @param {*} req 
     * @param {*} res 
     */
    async linkAccount(req, res) {
        if (req.session && req.session.user && req.session.user.is_nanny) {
            //verify if a session exists and if an user is connected
            const nannyId = req.session.user.id;
            const  { uniqueId } = req.body;

            //research if a parent exist with the unique Id
            const parent = await nannyDataMapper.getParentByUniqueId(uniqueId);

            if (!parent) {
                return res.send('pas de parent trouvé')
            }

            //verify if the parent hasn't already a nanny
            if (parent.nanny_id === null) {
            const parentId = parent.id;
            await nannyDataMapper.updateParent(parentId, nannyId);
            await nannyDataMapper.updateChildren(parentId, nannyId);

            return res.send('Nounou, Parents et enfants sont correctement liés') 
        } else {
            return res.send('le parent est déjà lié à une nounou')
        }} else {
            res.send ('vous devez être conencté en tant que nanny')
        }
    };

    /**
     * create a Diary by Nanny to one Parent
     * @param {*} req 
     * @param {*} res 
     */
    async createDiary(req, res) {
       //verify if a session exists and if an user is connected
            if (req.session && req.session.user && req.session.user.is_nanny) {
                const userId = req.session.user.id;
                //get the form with req.body
                const { date, description, parentId } = req.body;
            
                //add diary to database
                await nannyDataMapper.createDiary(date, description, userId, parentId);
                
                res.redirect('/dashboard');
            } else {
                res.redirect('/');
            }
        
    }

/**
 * add suggest by nanny to one Parent
 * @param {*} req 
 * @param {*} res 
 */
    async createSuggest(req, res) {
        //verify if a session exists and if an user is connected
            if (req.session && req.session.user && req.session.user.is_nanny) {
                const userId = req.session.user.id;
                //get the form with req.body
                const { title, parentId } = req.body;
            
                //add suggest to database
                await nannyDataMapper.createSuggest(title, parentId, userId);
                
                res.redirect('/dashboard');
            } else {
                res.redirect('/');
            }
    }
    
};


module.exports = new NannyController();