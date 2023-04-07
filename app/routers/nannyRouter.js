const express = require('express');

const nannyController = require('../controllers/nannyController');
const { catchErrors } = require('../middlewares/handlerError');

const router = express.Router();

/**
 * routes for the signup form in GET and create user in POST
 */
router.get('/signup', nannyController.signup.bind(nannyController));
router.post('/signup', nannyController.register.bind(nannyController));

/**
 * routes for the login form in GET and open session in POST
 */
router.get('/login', nannyController.loginForm.bind(nannyController));
router.post('/login',nannyController.login.bind(nannyController));

/**
 * routes for the profil in GET/PATCH/DELETE
 */

router.get('/profile', nannyController.getProfile.bind(nannyController));
router.patch('/profile', nannyController.modifyProfile.bind(nannyController));
router.delete('/profile', nannyController.deleteProfile.bind(nannyController));


/**
 * route for disconnect to the session 
 */
router.get('/logout', nannyController.logout.bind(nannyController));

module.exports = router;