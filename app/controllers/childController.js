const childDataMapper = require('../models/childDataMapper.js');

const childController = {

    async createChildren(req, res) {

    try {
    if (req.session && req.session.user) {
        const user = req.session.user
        const userId = user.id;
        
    //get the form with req.body
    const {name, first_name, sexe, birthday} = req.body;
   
    //add children user to database
        await childDataMapper.createChildren(name, first_name, sexe, birthday, userId, user.nanny_id);
    
    res.redirect('/profile'); 
    } 
    } catch (error) {
    console.error('Error :', error);
    throw error;
    }
    },

    async modifyChildren(req, res) {
    try {
        
    } catch (error) {
    console.error('Error :', error);
    throw error; 
    }  
    },

    async modifyChildren(req, res) {
    try {
    if (req.session && req.session.user) {
    const userId = req.session.user.id;
    
    const { id, name, first_name, sexe, birthday } = req.body;
            
    // update the child information in the database
    await childDataMapper.modifyChildren(id, name, first_name, sexe, birthday, userId);
            
    res.redirect('/profile');
    }
    } catch (error) {
    console.error('Error :', error);
    throw error;
    }
    },

    async removeChildren(req, res) {
    try {
    if (req.session && req.session.user) {
    const userId = req.session.user.id;
    const {id} = req.body
                
    // delete the child from the database
    await childDataMapper.removeChildren(id, userId);
                
    res.redirect('/profile');
    }
    } catch (error) {
    console.error('Error :', error);
    throw error;
    }
    }
}

module.exports = childController;