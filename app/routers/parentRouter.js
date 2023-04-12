const express = require('express');

const parentController = require('../controllers/parentController');
const { catchErrors } = require('../middlewares/handlerError');

const router = express.Router();

/**
 * routes for the signup form in GET and create user in POST
 */
// router.get('/signup', parentController.signupForm.bind(parentController));
router.post('/signup', parentController.register.bind(parentController));

/**
 * routes for the login form in GET and open session in POST
 */
//router.get('/login', parentController.loginForm.bind(nannyController));
router.post('/login',parentController.login.bind(parentController))


/**
 * routes for the profil in GET/PATCH/DELETE
 */

router.get('/profile', parentController.getProfile.bind(parentController));
router.patch('/profile', parentController.modifyProfile.bind(parentController));
router.post('/profile/delete', parentController.deleteProfile.bind(parentController));
/**
 * route for disconnect to the session 
 */
router.get('/logout', parentController.logout.bind(parentController));



module.exports = router;