const dataMapper = require("../datamapper/human");
const jsonwebtoken = require('jsonwebtoken');

const humanLoginController = {
    async signupAction (req, res) {
        const id = req.auth.userId; //todo mettre le req.auth
        const fakeObject = {};
        try {
            const AlreadyExists = await dataMapper.getMyhumans(id);
            const check = AlreadyExists[0];
            const isEmpty = Object.keys(check || fakeObject).length === 0;
            const searchedHuman = await dataMapper.getOneHumanByPseudo(req.body.pseudo);
            const fakeObject1 = {};
            const check1 = searchedHuman[0];
            const pseudo = check1 || fakeObject1;
            if (pseudo.pseudo == req.body.pseudo){
                throw new Error("human pseudonyme already exists");
            } if(!isEmpty) {
                res.status(500).send('You already have a human profile on this account')
            } else { // Préparer une instance de human
            const newHuman =  await dataMapper.createHuman(req.body.pseudo, req.body.image, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
            req.body.description, req.body.age,
            req.body.has_pets, req.body.has_kids, req.body.has_garden,
            req.auth.userId);

           res.json(newHuman);}
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
    },
    async loginAction(req, res) {
        const jwtSecret = process.env.JWT_SECRET;
        // On tente de récupérer le cat
        try {
            const searchedHuman = await dataMapper.getOneHumanByPseudo(req.body.pseudo);
        
            if (!searchedHuman) {
                throw new Error("Login does not work, pseudo does not exist");
            }
        // si tout va bien, rajoute le cat dans la session
        const sessionUser = searchedHuman[0];
         
        //TODO JWT -------------------------------------
        if(sessionUser) {
            // si tout va bien, rajoute l'utilisateur dans la session
        //req.session.user = sessionUser; //TODO voir si on a vraiment plus besoin des sessions ic - ça semble foncitonner sans!
        // pour éviter tout problème, on va supprimer le mdp de la session
        //delete req.session.user.password;
        //delete req.session.user.is_damin;
        //delete req.session.user.email
        console.log(sessionUser);
        const jwtContent = { humanId: sessionUser.id };
        const jwtOptions = { 
        algorithm: 'HS256', 
        expiresIn: '3h' 
        };
        console.log('<< 200', sessionUser.name);
        res.json({ 
            logged: true, 
            pseudo: sessionUser.name,
            token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
        });
        }
        else {
            console.log('<< 401 UNAUTHORIZED');
            res.sendStatus(401);
        }
              
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