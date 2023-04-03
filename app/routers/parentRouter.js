const express = require('express');

const parentController = require('../controllers/parentController');
const { catchErrors } = require('../middlewares/handlerError');

const router = express.Router();

/**
 * comments
 */
// router.get('/signup', parentController.signup);
router.post('/signup', parentController.register);


module.exports = router;