const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // module to generate an UNIQUE RANDOM id
const { tableName } = require("../models/coreDataMapper");
/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;


  signup(_, res) {
    res.render('signup');
}



logout(_, res) {
    req.session.destroy();
    res.redirect('/');
};

loginForm(_, res) {
    res.render('login');
}

  /**
   * login to parent or nanny account
   */
  async login(req, res) {
    
    //we get the form
    const {email, password } = req.body;

    //we compare the email if exists in database
    const user = await this.constructor.dataMapper.getUserByEmail(email);
    
    if (!user){
        return res.status(400).render('login', {error: 'l\'email est incorrect'});
    }

    //we compare the password of the user if it is the same
    const ok = await bcrypt.compare(password, user.password);

    if(!ok) {
        return res.status(400).render('login', {error: 'Le mot de passe est éronné'});
    }
    //we delete the password of the req.body
    delete req.body.password;
    req.session.user = user;
   
    return res.redirect('/dashboard');
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
        return res.render('login', {error: 'un compte avec cet email existe déjà'});
    }

    //compare password to passwordConfirmation from the form
    if(password !== passwordConfirmation) {
        return res.render('login', {error: 'Les mots de passe ne sont pas identique'});
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
    
    res.redirect('/');

}


/**
 * profile page in GET 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async getProfile(req, res) {

    //verify if a session exists and if an user is connected
    if (req.session && req.session.user) {
    const user = req.session.user;

    const children = await this.constructor.dataMapper.getChildren(user.id);
    
    return res.render('profile', {user, children});
    
} else {res.redirect('/')
  }
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
    let picture = null;
        if (req.file && req.file.filename) {
             picture = req.file.filename;
        };

    let _password = password
            if (email) {
            if(!email === user.email)  {
    //Compare if email is unique
    const comparedEmail = await this.constructor.dataMapper.getUserByEmail(email);

    if (comparedEmail){
        return res.status(400).render('profile', {error: 'un compte avec cet email existe déjà'});
    }}
}

// compare the old password to the actual password of the user
    if (password) {
        const ok = await bcrypt.compare(oldPassword, user.password);

    if(!ok) {
        return res.status(400).render('profile', {error: 'Le mot de passe est éronné'});
    }
    
    //compare password to passwordConfirmation from the form
    if(password !== passwordConfirmation) {
        return res.render('profile', {error: 'Les mots de passe ne sont pas identique'});
    }
    
    //crypt the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    _password = hash;
}
    //we modify the user to database
            await this.constructor.dataMapper.updateProfile(user.id, {name, first_name, email, _password, address, zip_code, city, picture});
    // we delete sensible information
            delete req.body.password;
            delete req.body.passwordConfirmation;
            delete req.body.oldPassword;
            req.session.user = user;

            return res.render('profile');

}else {res.render('/homepage')
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
     if (user.picture && user.picture !== `${tableName}_picture`) {
        // Delete the user's photo from the server
        const pathToDelete = `public/integration/uploads/${user.picture}`;
        fs.unlinkSync(pathToDelete);
    }
        //delete the user in database
        await this.constructor.dataMapper.deleteProfile(user.id);
        return res.render('homePage');
}}


}
  
module.exports = CoreController;
