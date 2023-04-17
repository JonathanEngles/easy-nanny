const childDataMapper = require('../models/childDataMapper.js');
const fs = require('fs');
const path = require('path');


const childController = {

    /**
     * create a new child by parent
     * @param {*} req 
     * @param {*} res 
     */
    async createChildren(req, res) {

        //verify if a session exists and if an user is connected and if the user is a parent
    if (req.session && req.session.user && !req.session.user.is_nanny) {
        //check if a picture was upload and require the name of the file
    let picture = null;
    if (req.file && req.file.filename) {
         picture = req.file.filename;
    }
        const user = req.session.user
        const userId = user.id;
        
    //get the form with req.body
    const {name, first_name, sexe, birthday} = req.body;
   
    //add children  to database
        await childDataMapper.createChildren(name, first_name, sexe, birthday, userId, user.nanny_id, picture);
    
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
   
        const { id } = req.params;
        //get the form with req.body
    const { name, first_name, sexe, birthday } = req.body;
    //verify if a session exists and if an user is connected and if the user is a parent
    if (req.session && req.session.user && !req.session.user.is_nanny) {
    //get the id of the user
    const userId = req.session.user.id;
    //check if a picture was upload and require the name of the file
    let picture
        if (req.file && req.file.filename) {
            const child = await childDataMapper.getChildById(id);
            if (child.picture && child.picture !== 'children_picture.jpg') {
                // Delete the child's photo from the server
                const pathToDelete = path.join(__dirname, '..', '..', 'assets', 'public', 'uploads', child.picture);
                fs.unlinkSync(pathToDelete);
            }
            picture = req.file.filename;
        };
    
            
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
    const child = await childDataMapper.getChildById(id);   
     // Check if the child has a photo and if it is not the default photo

        if (req.file && req.file.filename) {
            if (child.picture && child.picture !== 'children_picture.jpg') {
                // Delete the children's photo from the server
                const pathToDelete = path.join(__dirname, '..', '..', 'assets', 'public', 'uploads', child.picture);
                fs.unlinkSync(pathToDelete);
            }
    // delete the child from the database
    await childDataMapper.removeChildren(id, userId);
                
    res.redirect('/');
    }
    }
}
}

module.exports = childController;