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

    /**
     * Modify the activity by the nanny
     * @param {*} req 
     * @param {*} res 
     */
    async modifyActivity(req, res) {
        if (req.session && req.session.user) {
            const userId = req.session.user.id
            const {id, title, description, date, begin, end, color, category} = req.body;
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
        if (req.session && req.session.user) {
            const userId = req.session.user.id;
            const activityId = req.body.id;
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
    async addAccount(req, res) {
        if (req.session && req.session.user) {
            const nannyId = req.session.user.id;
            const  { uniqueId } = req.body;

            const parent = await nannyDataMapper.getParentByUniqueId(uniqueId);

            if (!parent) {
                return res.send('pas de parent trouvé')
            }
            if (parent.nanny_id === null) {
            const parentId = parent.id;
            await nannyDataMapper.updateParent(parentId, nannyId);
            await nannyDataMapper.updateChildren(parentId, nannyId);

            return res.send('Nounou, Parents et enfants sont correctement liés') 
        } else {
            return res.send('le parent est déjà lié à une nounou')
        }}
    };

    async createDiary(req, res) {
        try {
            if (req.session && req.session.user) {
                const userId = req.session.user.id;
                //get the form with req.body
                const { date, description, parentId } = req.body;
            
                //add user to database
                await nannyDataMapper.createDiary(date, description, userId, parentId);
                
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