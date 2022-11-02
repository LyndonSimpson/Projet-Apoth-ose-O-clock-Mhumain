const dataMapper = require("../datamapper/cat");

const catLoginController = {
    async signupAction (req, res) {
        // on a recu des infos de l'utilisateur (le post de son formulaire)
        // chercher si l'utilisateur peut créer ce compte (via la méthode findOne )
        try {
            const searchedCat = await dataMapper.getOneCatByPseudo(req.body.pseudo);
            //console.log(searchedUser);
            if (searchedCat.pseudo) {
                throw new Error("Email already exists");
            }
            // Préparer une instance de cat
            const newCat =  await dataMapper.createCat(req.body.pseudo, req.body.image, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
            req.body.description, req.body.race, req.body.age, req.body.sexe,
            req.body.color,
            req.body.likes_pets, req.body.likes_kids, req.body.needs_garden,
            req.body.siblings_id,
            req.session.user.id);

           res.json(newCat);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
    },
    async loginAction(req, res) {
        // On tente de récupérer le cat
        try {
            const searchedCat = await dataMapper.getOneCatByPseudo(req.body.pseudo);
        
            if (!searchedCat) {
                throw new Error("Login does not work, pseudo does not exist");
            }
        // si tout va bien, rajoute le cat dans la session
        const sessionUser = searchedCat[0];
        req.session.cat = sessionUser; 
        //console.log(req.session.cat)
        // maintenant que le cat est loggé, on renvoie vers la page d'accueil
            res.json(sessionUser);  
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
    disconnect(req, res) {
        // on va juste changer la valeur de la session
        req.session.user = false;
        res.send('succesfully disconnected')
        //console.log(req.session.user);
        // TODO ajouter ici le code qui va gérer l'action une fois que le user est déconnecté 
    }
};
module.exports = catLoginController;