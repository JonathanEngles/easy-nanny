const childDataMapper = require('../models/childDataMapper.js');

const childController = {

    /**
     * create a new child by parent
     * @param {*} req 
     * @param {*} res 
     */
    async createChildren(req, res) {

        //verify if a session exists and if an user is connected and if the user is a parent
    if (req.session && req.session.user && !req.session.user.is_nanny) {
        const user = req.session.user
        const userId = user.id;
        
    //get the form with req.body
    const {name, first_name, sexe, birthday} = req.body;
   
    //add children  to database
        await childDataMapper.createChildren(name, first_name, sexe, birthday, userId, user.nanny_id);
    
    res.redirect('/'); 
    } else {
        res.send('vous devez être connecté en tant que parent');
    }
    },

    /**
     * modify an existing child by parent
     * @param {*} req 
     * @param {*} res 
     */
    async modifyChildren(req, res) {
   
    //verify if a session exists and if an user is connected and if the user is a parent
    if (req.session && req.session.user && !req.session.user.is_nanny) {
    //get the id of the user
    const userId = req.session.user.id;
    
    //get the form with req.body
    const { id, name, first_name, sexe, birthday, picture } = req.body;
            
    // update the child information in the database
    await childDataMapper.modifyChildren(id, userId, {name, first_name, sexe, birthday, picture});
            
    res.redirect('/profile');
    }
    },

    /**
     * remove an existing child by parent
     * @param {*} req 
     * @param {*} res 
     */
    async removeChildren(req, res) {
    //verify if a session exists and if an user is connected and if the user is a parent
    if (req.session && req.session.user && !req.session.user.is_nanny) {
    const userId = req.session.user.id;
    const { id } = req.body
                
    // delete the child from the database
    await childDataMapper.removeChildren(id, userId);
                
    res.redirect('/');
    }
    }
}

module.exports = childController;