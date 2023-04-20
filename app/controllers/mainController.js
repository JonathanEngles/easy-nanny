const mainController = {
     getHomePage(req, res) {
        const error = req.query.error;
        if (req.session && req.session.user) {
        
            const user = req.session.user;
        res.render ('homePage', { error, user });
    } else {
        res.render ('homePage', { error });
    }
}
}


module.exports = mainController;