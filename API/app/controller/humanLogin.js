const dataMapper = require("../datamapper/human");

const humanLoginController = {
    async signupAction (req, res) {
        
        try {
            const searchedhuman = await dataMapper.getOneHumanByPseudo(req.body.pseudo);
            //console.log(searchedHuman);
            if (searchedhuman.pseudo) {
                throw new Error("human pseudonyme already exists");
            }
            // Préparer une instance de cat
            const newHuman =  await dataMapper.createHuman(req.body.pseudo, req.body.image, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
            req.body.description, req.body.age,
            req.body.has_pets, req.body.has_kids, req.body.has_garden,
            req.session.user.id);

           res.json(newHuman);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
    },
    async loginAction(req, res) {
        // On tente de récupérer le cat
        try {
            const searchedHuman = await dataMapper.getOneHumanByPseudo(req.body.pseudo);
        
            if (!searchedHuman) {
                throw new Error("Login does not work, pseudo does not exist");
            }
        // si tout va bien, rajoute le cat dans la session
        const sessionUser = searchedHuman[0];
        req.session.human = sessionUser; 
        //console.log(req.session.user);
        //console.log(req.session.human)
        // maintenant que le cat est loggé, on renvoie vers la page d'accueil
            res.json(sessionUser);  
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
    disconnect(req, res) {
        // on va juste changer la valeur de la session
        req.session.human = false;
        res.send('human succesfully disconnected')
        //console.log(req.session.human);
        // TODO ajouter ici le code qui va gérer l'action une fois que le user est déconnecté 
    }
};
module.exports = humanLoginController;