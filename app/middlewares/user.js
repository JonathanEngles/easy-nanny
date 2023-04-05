const userMiddleware= (request, response, next) => {
    if(request.session.user) {
        response.locals.user = request.session.user;
        next();
    } else {
        response.locals.user = null;
        return response.redirect('/login');
    }

}

module.exports = userMiddleware;