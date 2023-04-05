const express = require('express');

const nannyController = require('../controllers/nannyController');
const { catchErrors } = require('../middlewares/handlerError');

const router = express.Router();

/**
 * comments
 */
// router.get('/signup', nannyController.signup.bind(nannyController));
router.post('/signup', nannyController.register.bind(nannyController));


//router.get('/login', parentController.loginForm.bind(nannyController));
router.post('/login',nannyController.login.bind(nannyController));


module.exports = router;