const childDataMapper = require('../models/childDataMapper.js');

const childController = {

    async createChildren(req, res) {

    try {
    if (req.session && req.session.user) {
        const userId = req.session.user.id;
        
    //get the form with req.body
    const {name, first_name, sexe, birthday} = req.body;
  
    //add children user to database
    await childDataMapper.createChildren(name, first_name, sexe, birthday, userId);
    
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
    const childId = req.params.id;
    const { name, first_name, sexe, birthday } = req.body;
            
    // update the child information in the database
    await childDataMapper.modifyChildren(name, first_name, sexe, birthday, childId, userId);
            
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
    const childId = req.params.id; // assuming that the child ID is passed as a parameter in the URL
                
    // delete the child from the database
    await childDataMapper.removeChildren(childId, userId);
                
    res.redirect('/profile');
    }
    } catch (error) {
    console.error('Error :', error);
    throw error;
    }
    }
}

module.exports = childController;