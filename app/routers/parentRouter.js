const express = require('express');

const parentController = require('../controllers/parentController');
const childController = require('../controllers/childController.js');
const handlerController = require('../controllers/helpers/controllerHandler')

const router = express.Router();

/**
 * route to create user in POST
 */
router.post('/signup', handlerController(parentController.register.bind(parentController)));

/**
 * routes for the login form in GET and open session in POST
 */
router.post('/login',handlerController(parentController.login.bind(parentController)))


/**
 * routes for the profil in GET/PATCH/DELETE
 */

router.post('/profile', handlerController(parentController.modifyProfile.bind(parentController)));
router.post('/profile/delete', handlerController(parentController.deleteProfile.bind(parentController)));

/**
 * Route for suggest : POST
 */
router.post('/suggest', handlerController(parentController.createSuggest));


/**
 * route for disconnect to the session 
 */
// router.get('/logout', handlerController(parentController.logout.bind(parentController)));


/**
 * children routes: POST, PATCH, DELETE
 */
router.post('/children', handlerController(childController.createChildren));
router.post('/children/patch', handlerController(childController.modifyChildren));
router.post('/children/delete', handlerController(childController.removeChildren));

module.exports = router;