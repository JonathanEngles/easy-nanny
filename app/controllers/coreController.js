const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;


  signup(_, res) {
    res.render('signup');
}



logout(_, res) {
    req.session.destroy();
    res.render('homePage');
};

loginForm(_, res) {
    res.render('login');
}

  /**
   * login to parent or nanny account
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async login(req, res) {
    
    //we get the data of the form
    const {email, password } = req.body;

    //we compare the email if exist in database
    const user = await this.constructor.dataMapper.getUserByEmail(email);
    
    if (!user){
        return res.status(400).render('login', {error: 'l\'email est incorrect'});
    }
    const ok = await bcrypt.compare(password, user.password);

    if(!ok) {
        return res.status(400).render('login', {error: 'Le mot de passe est éronné'});
    }
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

    try {
        //get the form with req.body
    const {name, first_name, email, password, passwordConfirmation, address, zip_code, city} = req.body;

    //Compare if email is unique
    const comparedEmail = await this.constructor.dataMapper.getUserByEmail(email);

    if (comparedEmail){
        return res.render('signup', {error: 'un compte avec cet email existe déjà'});
    }

    //compare password to passwordConfirmation from the form
    if(password !== passwordConfirmation) {
        return res.render('signup', {error: 'Les mots de passe ne sont pas identique'});
    }
    
    //crypt the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let _password = hash;

    //generate a randow uniqueID
    const uniqueId = uuidv4();

    //add user to database
    await this.constructor.dataMapper.createUser(name, first_name, email, _password, address, zip_code, city, uniqueId);
    
    res.redirect('/signup');
} catch (error) {
    console.error('Error :', error);
    throw error;
}
}

async getProfile(req, res) {
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
    if (req.session && req.session.user) {
        const user = req.session.user;
        
        try {
            
            //get the form with req.body
    const {name, first_name, email, oldPassword, password, passwordConfirmation, address, zip_code, city} = req.body;
    let _password = password
            if (email) {
    //Compare if email is unique
    const comparedEmail = await this.constructor.dataMapper.getUserByEmail(email);

    if (comparedEmail){
        return res.status(400).render('profile', {error: 'un compte avec cet email existe déjà'});
    }
}

// compare the old password to the password of the user
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

            await this.constructor.dataMapper.updateProfile(user.id, {name, first_name, email, _password, address, zip_code, city});

            delete req.body.password;
            delete req.body.passwordConfirmation;
            delete req.body.oldPassword;
            req.session.user = user;

            return res.render('profile');

            
        } catch (error) {
            console.error('Error :', error);
            throw error;
        }



}else {res.render('/homepage')
}
}

/**
 * delete an user if nanny delete juste nanny, if parent delete his children
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 async deleteProfile(req, res) {
    if (req.session && req.session.user) {
        const user = req.session.user;
        await this.constructor.dataMapper.deleteProfile(user.id);
        return res.render('homePage');
}}


}
  
module.exports = CoreController;
