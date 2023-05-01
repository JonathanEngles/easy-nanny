const express = require('express');

const mainController = require('../controllers/mainController');
const nannyController = require('../controllers/nannyController');
const handlerController = require('../controllers/helpers/controllerHandler')
const parentRouter = require('./parentRouter');
const nannyRouter = require('./nannyRouter');


const router = express.Router();


router.get('/', mainController.getHomePage);
router.get('/logout', handlerController(nannyController.logout));



/**
 * secondary router for parents and nannys
 */
router.use('/parent', parentRouter);
router.use('/nanny', nannyRouter);

/**
 * middleware for error
 */
router.use((err, req, res, next) => {
    res.status(err.status).render('error', { error: err.message });
});

/**
 * route 404
 */
router.use((_,res) => {
    res.status(404).render('404');
});


module.exports = router;