const express = require('express');

const mainController = require('../controllers/mainController');

const parentRouter = require('./parentRouter');
const nannyRouter = require('./nannyRouter');


const router = express.Router();

const { catchErrors } = require('../middlewares/handlerError');

router.get('/', mainController.getHomePage);


/**
 * secondary router for parents and nannys
 */
router.use('/parent', parentRouter);
router.use('/nanny', nannyRouter);




/**
 * route 404
 */
router.use((_,res) => {
    res.status(404).render('404');
});


module.exports = router;