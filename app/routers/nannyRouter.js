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
router.post('/profile/delete', nannyController.deleteProfile.bind(nannyController));

/**
 * Route for suggest : POST
 */
router.post('/suggest', nannyController.createSuggest)

/**
 * Route for Diary : POST
 */
router.post('/diary', nannyController.createDiary);


/**
 * route for disconnect to the session 
 */
router.get('/logout', nannyController.logout.bind(nannyController));


/**
 * route for activity in POST/PATCHE/DELETE
 */
router.post('/activity', nannyController.createActivity);
router.post('/activity/patch', nannyController.modifyActivity);
router.post('/activity/delete', nannyController.deleteActivity);


/**
 * route to add a new parent account and his children to the nanny account
 */
router.post('/link', nannyController.linkAccount);

module.exports = router;