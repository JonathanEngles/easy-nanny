const mainController = {
     getHomePage(req, res) {
        
        if (req.session && req.session.user) {
        
            const user = req.session.user;
        res.render ('homePage', { user });
    } else {
        res.render ('homePage');
    }
}
}


module.exports = mainController;