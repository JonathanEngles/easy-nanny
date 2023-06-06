const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // module to generate an UNIQUE RANDOM id
const fs = require('fs');
const { tableName } = require("../models/coreDataMapper");
const path = require('path');
/** Class representing an abstract core controller. */
class CoreController {
    static dataMapper;
    // static user;

    /**
     * login to parent or nanny account
     */
    async login(req, res) {

        //we get the form
        const { email, password, rememberMe } = req.body;

        //we compare the email if exists in database
        const user = await this.constructor.dataMapper.getUserByEmail(email);

        if (!user) {
            //message for toast notification
            req.session.flash = { error: `l'email ou le mot de passe est incorrect` }
            return res.redirect('/');
        }

        //we compare the password of the user if it is the same
        const ok = await bcrypt.compare(password, user.password);

        if (!ok) {
            //message for toast notification
            req.session.flash = { error: `l'email ou le mot de passe est incorrect` }
            return res.redirect('/');
        }
        //we delete the password of the req.body
        delete req.body.password;
        req.session.user = user;
        //if checkbox is checked, we add reload expires of the session.
        if (rememberMe) {
            const time = 3600000 * 24 * 30; // add one month to the session
            req.session.cookie.expires = new Date(Date.now() + time);
            req.session.cookie.maxAge = time;
        }

        //message for toast notification
        req.session.flash = { success: `Bienvenue ${user.first_name}` };
        // check if user is a nanny or a parent
        if (user.is_nanny) {
            return res.redirect('/nanny/dashboard');
        } else {
            return res.redirect('/parent/dashboard');
        }
    }

    /**
     * create account of Nanny or Parent
     */
    async register(req, res) {

        //get the form with req.body
        const { name, first_name, email, password, passwordConfirmation, address, zip_code, city } = req.body;

        //check if a picture was upload and require the name of the file
        let picture = null;
        if (req.file && req.file.filename) {
            picture = req.file.filename;
        }
        //Compare if email is unique
        const comparedEmail = await this.constructor.dataMapper.getUserByEmail(email);

        if (comparedEmail) {


            req.session.flash = { error: `un compte avec cet email existe déjà` }
            return res.redirect('/');

        }

        //compare password to passwordConfirmation from the form
        if (password !== passwordConfirmation) {


            req.session.flash = { error: `les mots de passe ne correspondent pas` }
            return res.redirect('/');

        }

        //crypt the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        //variable created to give argument to create user
        let _password = hash;

        //generate a randow uniqueID
        const uniqueId = uuidv4();

        //add user to database
        await this.constructor.dataMapper.createUser(name, first_name, email, _password, address, zip_code, city, picture, uniqueId);

        req.session.flash = { success: `compte créé avec succès, vous pouvez vous connecter dès à présent` }
        return res.redirect('/');

    }


    /**
     * Modify the Profile of the user
     */

    async modifyProfile(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user) {
            const user = req.session.user;
            //get the form of req.body
            const { name, first_name, email, oldPassword, password, passwordConfirmation, address, zip_code, city } = req.body;
            //check if a picture was upload and require the name of the file
            let picture
            if (req.file && req.file.filename) {
                // Check if user has a picture other than the default ones
                if (user.picture && user.picture !== "parent_picture.jpg" && user.picture !== "nanny_picture.jpg") {
                    // Delete the user's photo from the server
                    const pathToDelete = path.join(__dirname, '..', '..', 'assets', 'public', 'uploads', user.picture);
                    fs.unlinkSync(pathToDelete);
                }
                picture = req.file.filename;
            } else {
                picture = user.picture;
            }
            if (email) {
                if (!email === user.email) {
                    //Compare if email is unique
                    const comparedEmail = await this.constructor.dataMapper.getUserByEmail(email);
                    if (comparedEmail) {
                        req.session.flash = { error: `un compte avec cet email existe déjà` }
                        // check if user is a nanny or a parent
                        if (user.is_nanny) {
                            return res.redirect(`/nanny/dashboard`);
                        } else {
                            return res.redirect(`/parent/dashboard`);

                        }
                    }
                }
            }
            // compare the old password to the actual password of the user
            let _password = password
            if (password) {
                const ok = await bcrypt.compare(oldPassword, user.password);

                if (!ok) {
                    req.session.flash = { error: `le mot de passe est érroné` }
                    // check if user is a nanny or a parent
                    if (user.is_nanny) {

                        return res.redirect(`/nanny/dashboard`);
                    } else {
                        return res.redirect(`/parent/dashboard`);

                    }
                }
                //compare password to passwordConfirmation from the form
                if (password !== passwordConfirmation) {
                    req.session.flash = { error: `les mots de passe ne correspondent pas` }
                    // check if user is a nanny or a parent
                    if (user.is_nanny) {

                        return res.redirect(`/nanny/dashboard`);
                    } else {
                        return res.redirect(`/parent/dashboard`);
                    }
                }
                //hash the password
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);

                _password = hash;
            }
            //we modify the user to database
            await this.constructor.dataMapper.updateProfile(user.id, { name, first_name, email, _password, address, zip_code, city, picture });
            //we update the user
            const updatedUser = await this.constructor.dataMapper.getUserById(user.id);

            // we delete sensible information
            delete req.body.password;
            delete req.body.passwordConfirmation;
            delete req.body.oldPassword;
            req.session.user = updatedUser;

            req.session.flash = { success: `votre compte a été modifié avec succès` }

            // check if user is a nanny or a parent
            if (updatedUser.is_nanny) {
                return res.redirect('/nanny/dashboard');
            } else {
                return res.redirect('/parent/dashboard');
            }

        } else {
            req.session.flash = { error: `Vous devez être connecté` }
            res.redirect(`/`);
        }
    }


    /**
     * delete an user : if nanny is deleted just nanny is deleted, if parent is deleted his children are deleted too
     */
    async deleteProfile(req, res) {
        //verify if a session exists and if an user is connected
        if (req.session && req.session.user) {
            const user = req.session.user;
            const { id } = req.body;

            // Check if the user has a photo and if it is not the default photo
            if (user.picture && user.picture !== `${tableName}_picture.jpg`) {
                // Delete the user's photo from the server
                const pathToDelete = path.join(__dirname, '..', '..', 'assets', 'public', 'uploads', user.picture);
                fs.unlinkSync(pathToDelete);
            }


            //delete the user in database
            await this.constructor.dataMapper.deleteProfile(id);
            req.session.destroy();
            // req.session.flash = {success: `Votre compte a été supprimé avec succès`}
            return res.redirect('/');
        }


    }
}

module.exports = CoreController;
