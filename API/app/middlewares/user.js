// Middleware permettant de stocker l'user dans nos locales
const userMiddleware = (req, res, next) => {


    // première étape, regarde si l'utilisateur demandant une url possède dans sa requête, une session

    if (req.session.user) {
        // si c'est le cas, on stocke dans la réponse les données contenues dans sa session, afin qu'elles puissent être utilisées dans la vue
        res.locals.user = req.session.user;
    } else {
        // sinon, on ne stocke rien
        res.locals.user = false;
    }
    // via next on passe au middleware suivant
    next();
};

// on exporte ce module afin qu'il puisse être utilisé dans index.js via app.use()
module.exports = userMiddleware;