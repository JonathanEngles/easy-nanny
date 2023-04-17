const express = require('express');

const nannyController = require('../controllers/nannyController');
const handlerController = require('../controllers/helpers/controllerHandler')
const router = express.Router();

/**
 * route to create user in POST
 */
router.post('/signup', handlerController(nannyController.register.bind(nannyController)));

/**
 * routes for the login form in GET and open session in POST
 */
router.get('/login', handlerController(nannyController.loginForm.bind(nannyController)));
router.post('/login',handlerController(nannyController.login.bind(nannyController)));

/**
 * routes for the profil in GET/PATCH/DELETE
 */

// router.get('/profile', handlerController(nannyController.getProfile.bind(nannyController)));
router.post('/profile', handlerController(nannyController.modifyProfile.bind(nannyController)));
router.post('/profile/delete', handlerController(nannyController.deleteProfile.bind(nannyController)));

/**
 * Route for suggest : POST
 */
router.post('/suggest', handlerController(nannyController.createSuggest))

/**
 * Route for Diary : POST
 */
router.post('/diary', handlerController(nannyController.createDiary));


/**
 * route for disconnect to the session 
 */
// router.get('/logout', handlerController(nannyController.logout.bind(nannyController)));


/**
 * route for activity in POST/PATCHE/DELETE
 */
router.post('/activity', handlerController(nannyController.createActivity));
router.post('/activity/patch', handlerController(nannyController.modifyActivity));
router.post('/activity/delete', handlerController(nannyController.deleteActivity));


/**
 * route to add a new parent account and his children to the nanny account
 */
router.post('/link', handlerController(nannyController.linkAccount));

module.exports = router;