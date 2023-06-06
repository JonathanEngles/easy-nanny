const childDataMapper = require('../models/childDataMapper.js');
const fs = require('fs');
const path = require('path');


const childController = {

    /**
     * create a new child by parent
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
            const { name, first_name, sexe, birthday, description } = req.body;
            //add children  to database
            await childDataMapper.createChildren(name, first_name, sexe, birthday, description, userId, user.nanny_id, picture);
            req.session.flash = { success: `${first_name} créé(e) avec succès` }
            return res.redirect('/parent/dashboard');
        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            return res.redirect('/');
        }
    },

    /**
     * modify an existing child by parent 
     */
    async modifyChildren(req, res) {
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const { id } = req.params;
            const childrenId = parseInt(id, 10);

            const child = await childDataMapper.getChildById(childrenId);
            const originalFirstName = child.first_name;

            //get the form with req.body
            const { name, first_name, sexe, birthday, description } = req.body;
            //verify if a session exists and if an user is connected and if the user is a parent

            //get the id of the user
            const userId = req.session.user.id;

            let modifiedFirstName = '';
            if (first_name) {
                modifiedFirstName = first_name;
            } else {
                // Utiliser le prénom original de la base de données si le prénom n'a pas été renseigné dans le formulaire
                modifiedFirstName = originalFirstName;
            }

            //check if a picture was upload and require the name of the file
            let picture
            if (req.file && req.file.filename) {

                if (child.picture && child.picture !== 'children_picture.jpg') {
                    // Delete the child's photo from the server
                    const pathToDelete = path.join(__dirname, '..', '..', 'assets', 'public', 'uploads', child.picture);
                    fs.unlinkSync(pathToDelete);
                }
                picture = req.file.filename;
            };


            // update the child information in the database
            await childDataMapper.modifyChildren(childrenId, userId, { name, first_name: modifiedFirstName, sexe, birthday, description, picture });

            req.session.flash = { success: `${modifiedFirstName} a été modifié(e) avec succès` }
            return res.redirect('/parent/dashboard');
        }
    },


    /**
     * remove an existing child by parent
     */
    async removeChildren(req, res) {
        //verify if a session exists and if an user is connected and if the user is a parent
        if (req.session && req.session.user && !req.session.user.is_nanny) {
            const userId = req.session.user.id;
            const { id } = req.body
            const child = await childDataMapper.getChildById(id);
            // Check if the child has a photo and if it is not the default photo

            if (child.picture && child.picture !== 'children_picture.jpg') {
                // Delete the children's photo from the server
                const pathToDelete = path.join(__dirname, '..', '..', 'assets', 'public', 'uploads', child.picture);
                fs.unlinkSync(pathToDelete);
            }
            // delete the child from the database
            await childDataMapper.removeChildren(id, userId);

            req.session.flash = { success: `Enfant supprimé avec succès de votre compte` }
            return res.redirect('/parent/dashboard');

        }
    }
}

module.exports = childController;