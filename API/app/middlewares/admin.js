const adminMiddleware = (req, res, next) => { //TODO ce middleware est à caller en params avant le controller de chaque route réservée aux admins
     
    if (!req.session.user) {
        return res.redirect('user/login');
    }
    console.log(req.session.user);
    // on vérifie si l'utilisateur a le rôle d'admin
    if (req.session.user.role === 'admin') {
        next();
    } else {
        return res.status(401).send('error 401 : not authorized');
    }
};

module.exports = adminMiddleware;