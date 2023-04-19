const mainController = {
     getHomePage(req, res) {
        const error = req.query.error;
        res.render ('homePage', { error });
    }
}


module.exports = mainController;