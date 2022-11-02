const loggedMiddleware = (req, res, next) => { //TODO middleware qui bloque l'accès aux foncitonnaltiés connectées si le user n'a pas une session
     
    if (!req.session.user) {
        return res.redirect('user/login'); // si le user n'a pas de session, redirection age de login!
    } else {
        next(); // sinon on le laisse continuer sur la route demandée!
    }
};

module.exports = loggedMiddleware;