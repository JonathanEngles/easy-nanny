exports.catchErrors = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);

         return fn(req, res, next).catch(err => next(err));
    }
}

exports.notFound = (request, response, next) => {
    const err = new Error('La page demandée n\'existe pas');

    err.status = 404;

    next(err);
}

// On doit faire un middleware qui affiche les erreurs
exports.errorsCollector = (error, request, response, next) => {
    const status = error.status || 500;

    return response.status(status).send('error', {error: error});
}
