const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // module to generate an UNIQUE RANDOM id
const fs = require('fs');
const { tableName } = require("../models/coreDataMapper");
const path = require('path');
const { log } = require('console');
/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;
    static user;

  /**
   * login to parent or nanny account
   */
  async login(req, res) {
    
    //we get the form
    const {email, password } = req.body;

    //we compare the email if exists in database
    const user = await this.constructor.dataMapper.getUserByEmail(email);
    
    if (!user){
        return res.render('homePage', {error: `l'email est incorrect`});
    }

    //we compare the password of the user if it is the same
    const ok = await bcrypt.compare(password, user.password);

    if(!ok) {
        return res.render('homePage', {error: `le mot de passe est erronné`});
    }
    //we delete the password of the req.body
    delete req.body.password;
    req.session.user = user;
   
    // check if user is a nanny or a parent
    if (user.is_nanny) {
        return res.redirect('/nanny/dashboard');
    } else {
        return res.redirect('/parent/dashboard');
    }
}

/**
 * create account of Nanny or Parent
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async register(req, res) {

        //get the form with req.body
    const {name, first_name, email, password, passwordConfirmation, address, zip_code, city} = req.body;

    //check if a picture was upload and require the name of the file
    let picture = null;
        if (req.file && req.file.filename) {
             picture = req.file.filename;
        }
    //Compare if email is unique
    const comparedEmail = await this.constructor.dataMapper.getUserByEmail(email);

    if (comparedEmail){

       
        return res.render('homePage', {error: `cet email est déjà utilisé`});

    }

    //compare password to passwordConfirmation from the form
    if(password !== passwordConfirmation) {

       
        return res.render('homePage', {error: `les mots de passe ne correspondent pas`});

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
    
    res.render('homePage', {message:'Compte créé correctement'});

}


/**
 * Modify the Profile of the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

async modifyProfile(req, res) {
     //verify if a session exists and if an user is connected
    if (req.session && req.session.user) {
        
        const user = req.session.user;
        
            
            //get the form of req.body
    const {name, first_name, email, oldPassword, password, passwordConfirmation, address, zip_code, city} = req.body;
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
    let _password = password
            if (email) {
            if(!email === user.email)  {
    //Compare if email is unique
    const comparedEmail = await this.constructor.dataMapper.getUserByEmail(email);

    if (comparedEmail){
       
        // check if user is a nanny or a parent
    if (user.is_nanny) {
        return res.redirect(`/nanny/profile`);
    } else {
        return res.redirect(`/parent/profile`);

    }
    }}
}

// compare the old password to the actual password of the user
    if (password) {
        const ok = await bcrypt.compare(oldPassword, user.password);

    if(!ok) {
        
        // check if user is a nanny or a parent
    if (user.is_nanny) {
        
        return res.redirect(`/nanny/profile`);
    } else {
        return res.redirect(`/parent/profile`);

    }
    }
    
    //compare password to passwordConfirmation from the form
    if(password !== passwordConfirmation) {
       
        // check if user is a nanny or a parent
    if (user.is_nanny) {

        return res.redirect(`/nanny/profile`);
    } else {
        return res.redirect(`/parent/profile`);

    }
    }
    
    //crypt the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    _password = hash;
}
    //we modify the user to database
            await this.constructor.dataMapper.updateProfile(user.id, {name, first_name, email, _password, address, zip_code, city, picture});
            //we update the user
            const updatedUser = await this.constructor.dataMapper.getUserById(user.id);


    // we delete sensible information
            delete req.body.password;
            delete req.body.passwordConfirmation;
            delete req.body.oldPassword;
            req.session.user = updatedUser;
            // check if user is a nanny or a parent
    if (updatedUser.is_nanny) {
        return res.redirect('/nanny/profile');
    } else {
        return res.redirect('/parent/profile');
    }

}else {
  
    res.redirect(`/`);
}
}


/**
 * delete an user : if nanny is deleted just nanny is deleted, if parent is deleted his children are deleted too
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 async deleteProfile(req, res) {
    //verify if a session exists and if an user is connected
    if (req.session && req.session.user) {
        const user = req.session.user;
        // Check if the user has a photo and if it is not the default photo
        if (req.file && req.file.filename) {
            if (user.picture && user.picture !== `${tableName}_picture.jpg`) {
                // Delete the user's photo from the server
                const pathToDelete = path.join(__dirname, '..', '..', 'assets', 'public', 'uploads', user.picture);
                fs.unlinkSync(pathToDelete);
            }
        //delete the user in database
        await this.constructor.dataMapper.deleteProfile(user.id);
        return res.redirect('/');
}}


}}
  
module.exports = CoreController;
