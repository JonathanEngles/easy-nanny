const dataMapper = require('../models/dataMapper');
const bcrypt = require('bcrypt');

const parentController = {



    signup(_, res) {
        res.render('signup');
    },


    /**
     * register for parent
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async register(req, res) {

        try {
            //get the form with req.body
        const {name, first_name, email, password, passwordConfirmation, address, zip_code, city} = req.body;

        console.log(req.body, 'reqBody');

        //Compare if email is unique
        const comparedEmail = await dataMapper.getEmail(email);

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

        //add parent to database
        await dataMapper.addParent(name, first_name, email, _password, address, zip_code, city);
        
        res.redirect('/signup');
    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
    }
}



module.exports = parentController;