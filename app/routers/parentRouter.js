const express = require('express');

const parentController = require('../controllers/parentController');
const { catchErrors } = require('../middlewares/handlerError');

const router = express.Router();

/**
 * comments
 */
// router.get('/signup', parentController.signupForm.bind(parentController));
router.post('/signup', parentController.register.bind(parentController));


//router.get('/login', parentController.loginForm.bind(nannyController));
router.post('/login',parentController.login.bind(parentController))

module.exports = router;