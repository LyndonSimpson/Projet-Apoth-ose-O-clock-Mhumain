const dataMapper = require("../datamapper/user");

// on récupère ce package afin de vérifier le format de l'email passé par l'utilisateur lors de l'inscription
const emailValidator = require('email-validator');

// on récupère bcrypt pour hasher le mdp
const bcrypt = require('bcrypt');

const userController = {


    
    async signupAction (req, res) {
        // on a recu des infos de l'utilisateur (le post de son formulaire)
        // chercher si l'utilisateur peut créer ce compte (via la méthode findOne )
        try {
            const searchedUser = await dataMapper.getOneUserByEmail(req.body.email);
            console.log(searchedUser);
            if (searchedUser) {
                throw new Error("Email already exists");
            }
            // vérifie que le format de l'email est valide ex: user@user.com
            if (!emailValidator.validate(req.body.email)) {
                throw new Error("Email format is not valid");
            }
            // vérifier que le mdp correspond au mdp à confirmer
            if (req.body.password !== req.body.passwordConfirm) {
                throw new Error("Password and confirmed Password does not match");
            }
            // encrypter le mdp
            // ici on encrypte le mdp via le module bcrypt, qui nous demande en premier paramètre le mdp et en deuxième paramètre le nombre de tour de hashage
            const encryptedMsg =  bcrypt.hashSync(req.body.password, 10);

            // Préparer une instance de user
            const newUser =  await dataMapper.createUser(res.body.email, encryptedMsg);
            // sauvegarder l'user
            
           // renvoyer l'utilisateur vers la page de connexion
           res.json(newUser);

        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
    },

    async loginAction(req, res) {
        // On tente de récupérer l'utilisateur
        try {
            const searchedUser = await dataMapper.getOneUserByEmail(req.body.email);
        
            if (!searchedUser) {
                throw new Error("Login does not work, email or password invalid");
            }

        // si on a un utilisateur, on vérifie que le mdp soit valide
        const validPwd = bcrypt.compareSync(req.body.password, searchedUser.password);
        if (!validPwd) {
            throw new Error("Login does not work, email or password invalid");
        }
        // si tout va bien, rajoute l'utilisateur dans la session
        req.session.user = searchedUser.dataValues;
        // pour éviter tout problème, on va supprimer le mdp de la session
        delete req.session.user.password;
        console.log(req.session.user)
        // maintenant que l'user est loggé, on renvoie vers la page d'accueil
        if (searchedUser.is_admin === true) {
            res.json(searchedUser); //TODO, ici mettre le code pour middlWare admin ? - renvoyer le user vers page admin si page admin
        } else {
            res.json(searchedUser); //TODO gérer le "res." aussi ici 
        }
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
     
    },

    disconnect(req, res) {
        // on va juste changer la valeur de la session
        req.session.user = false;
        // TODO ajouter ici le code qui va gérer l'action une fois que le user est déconnecté 
    }
};

module.exports = userController;