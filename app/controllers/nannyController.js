const CoreController = require('./coreController');
const nannyDataMapper = require('../models/nannyDataMapper');



class NannyController extends CoreController {

    static dataMapper = nannyDataMapper;
    constructor() {
        super();
    }


    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
/**
 * create activity by the nanny
 * @param {*} req 
 * @param {*} res 
 */
    async createActivity (req, res) {
        //verify if a session exists and if an user is connected and if the user is a nanny
        if (req.session && req.session.user && req.session.user.is_nanny) {
          const user = req.session.user
          //get the form with req.body
        const {title, description, date, begin, end, color, category} = req.body;

            //add activity to the database
        await nannyDataMapper.createActivity(title, description, date, begin, end, color, category, user);
        res.redirect('/nanny/dashboard')
        } else {res.redirect('/')
    }

    }

    /**
     * Modify the activity by the nanny
     * @param {*} req 
     * @param {*} res 
     */
    async modifyActivity(req, res) {
        //verify if a session exists and if an user is connected and if the user is a nanny
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const userId = req.session.user.id
            //get the form with req.body
            const {id, title, description, date, begin, end, color, category} = req.body;
            //modify the activity in the database
            await nannyDataMapper.modifyActivity(id, userId, {title, description, date, begin, end, color, category});
            res.redirect('/nanny/dashboard')
        } else {res.redirect('/')
    }
};

/**
 * delete the activity
 * @param {*} req 
 * @param {*} res 
 */
    async deleteActivity(req, res) {
        //verify if a session exists and if an user is connected and if the user is a nanny
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const userId = req.session.user.id;
            //get the id of activity by his form
            const activityId = req.body.id;

            //delete the activity in database
            await nannyDataMapper.deleteActivity(userId, activityId);
            res.redirect('/nanny/dashboard');
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
        //verify if a session exists and if an user is connected and if the user is a nanny
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

            await nannyDataMapper.updateFamily(parentId, nannyId);
            

            return res.send(`la famille ${parent.name} est correctement liée`) 
        } else {
            return res.send('le parent est déjà lié à une nounou')
        }} else {
            res.send ('vous devez être connecté en tant que nanny')
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
                const user = req.session.user;
                //get the form with req.body
                const { date, description, parentId } = req.body;
            
                //add diary to database
                await nannyDataMapper.createDiary(date, description, user, parentId);
                
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
                const user = req.session.user;
                //get the form with req.body
                const { title, parentId } = req.body;
            
                //add suggest to database
                await nannyDataMapper.createSuggest(title, parentId, user);
                
                res.redirect('nannyDashboard');
            } else {
                res.redirect('/');
            }
    }


    async getNannyDashboard(req, res) {
        //verify if a session exists and if a Nanny is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user;
        

            const activity = await nannyDataMapper.getAllActivity(user.id);
            const children = await nannyDataMapper.getAllChildren(user.id);
            const parent = await nannyDataMapper.getAllParents(user.id);
            const suggest = await nannyDataMapper.getSuggests(user.id);

            if (!children) {
                children = [];
              };

              if (!parent) {
                parent = [];
              };

              if (!activity) {
                activity = [];
              };

              if (!suggest) {
                suggest = [];
              };


            res.render('nannyDashboard', { activity, children, parent, user, suggest });

     } else {
        return res.render('homePage', {error: `pas d'utilisateurs connectés`});
}

    }

    async getNannyProfile(req, res) {
        //verify if a session exists and if a Nanny is connected
        if (req.session && req.session.user && req.session.user.is_nanny) {
            const user = req.session.user;
            const children = await nannyDataMapper.getAllChildren(user.id);
            const parent = await nannyDataMapper.getAllParents(user.id);

            if (!children) {
                children = [];
              };

              if (!parent) {
                parent = [];
              }

    res.render('nannyProfile', { children, parent, user, error });

} else {

   return res.render('homePage', {error: `pas d'utilisateurs connectés`});
}
    
    }

async getNannySuggests(req, res) {
    //verify if a session exists and if a Nanny is connected
    if (req.session && req.session.user && req.session.user.is_nanny) {
        const user = req.session.user;


        const suggests = await nannyDataMapper.getAllSuggests(user.id)

        if (!suggests) {
            suggests = [];
          };

        res.render('nannySuggests', { suggests, user });
    } else {

        return res.render('homePage', {error: `pas d'utilisateurs connectés`});
     }
}


async getNannyDiaries(req,res) {
    //verify if a session exists and if a Nanny is connected
    if (req.session && req.session.user && req.session.user.is_nanny) {
        const user = req.session.user;

        const diaries = await nannyDataMapper.getAllDiaries(user.id);

        if (!diaries) {
            diaries = [];
          };
        res.render('nannyDiaries', { user, diaries });
    } else {
        return res.render('homePage', {error: `pas d'utilisateurs connectés`});
}
}



};


module.exports = new NannyController();