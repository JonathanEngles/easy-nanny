const bcrypt = require('bcrypt');
/** Class representing an abstract core controller. */
class CoreController {
  static dataMapper;


  signup(_, res) {
    res.render('signup');
}


loginForm(_, res) {
    res.render('login');
}

  /**
   * responds with all entries from a table
   *
   * @param {Object} _
   * @param {Object} response
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



    return res.redirect('/login');
    
    
}

/**
     * register for user
     * 
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

    //add nanny to database
    await this.constructor.dataMapper.createUser(name, first_name, email, _password, address, zip_code, city);
    
    res.redirect('/signup');
} catch (error) {
    console.error('Error :', error);
    throw error;
}
}
  }

  
module.exports = CoreController;
