const childDataMapper = require('../models/childDataMapper.js');

const childController = {

    /**
     * create a new child by parent
     * @param {*} req 
     * @param {*} res 
     */
    async createChildren(req, res) {

        //verify if a session exists and if an user is connected
    if (req.session && req.session.user) {
        const user = req.session.user
        const userId = user.id;
        
    //get the form with req.body
    const {name, first_name, sexe, birthday} = req.body;
   
    //add children  to database
        await childDataMapper.createChildren(name, first_name, sexe, birthday, userId, user.nanny_id);
    
    res.redirect('/profile'); 
    } 
    },

    /**
     * modify an existing child by parent
     * @param {*} req 
     * @param {*} res 
     */
    async modifyChildren(req, res) {
   
    //verify if a session exists and if an user is connected
    if (req.session && req.session.user) {
    //get the id of the user
    const userId = req.session.user.id;
    
    //get the form with req.body
    const { id, name, first_name, sexe, birthday } = req.body;
            
    // update the child information in the database
    await childDataMapper.modifyChildren(id, name, first_name, sexe, birthday, userId);
            
    res.redirect('/profile');
    }
    },

    /**
     * remove an existing child by parent
     * @param {*} req 
     * @param {*} res 
     */
    async removeChildren(req, res) {
    //verify if a session exists and if an user is connected
    if (req.session && req.session.user) {
    const userId = req.session.user.id;
    const { id } = req.body
                
    // delete the child from the database
    await childDataMapper.removeChildren(id, userId);
                
    res.redirect('/parent/profile');
    }
    }
}

module.exports = childController;