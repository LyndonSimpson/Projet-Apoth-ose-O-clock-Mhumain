const dataMapper = require("../datamapper/cat");
const jsonwebtoken = require('jsonwebtoken');

const catLoginController = {
    async signupAction (req, res) {
        // on a recu des infos de l'utilisateur (le post de son formulaire)
        // chercher si l'utilisateur peut créer ce compte (via la méthode findOne )
        try {
            const searchedCat = await dataMapper.getOneCatByPseudo(req.body.pseudo);
            //console.log(searchedCat);
            const fakeObject = {};
            const check = searchedCat[0];
            const pseudo = check || fakeObject;
            if (pseudo.pseudo == req.body.pseudo) {
                throw new Error("cat pseudonyme already exists");
            }
            console.log(`nouveau chat créé : ${req.body.pseudo}`);
            console.log(`nom de sa photo : ${req.file.filename}`);
            console.log(req);
            const image_name = req.file.filename;
            // Préparer une instance de cat
            const newCat =  await dataMapper.createCat(req.body.pseudo, image_name, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
            req.body.description, req.body.race, req.body.age, req.body.sexe,
            req.body.color,
            req.body.likes_pets, req.body.likes_kids, req.body.needs_garden,
            req.body.siblings_id,
            req.auth.userId);

           res.json(newCat);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
          }
    },
    async loginAction(req, res) {
        const jwtSecret = process.env.JWT_SECRET;
        console.log(req);
        const accountId = req.auth.userId;
        // On tente de récupérer le cat
        try {
            const searchedCat = await dataMapper.getOneCatByPseudo(req.body.pseudo);
        
            if (!searchedCat) {
                throw new Error("Login does not work, pseudo does not exist");
            }
        // si tout va bien, rajoute le cat dans la session
        const sessionUser = searchedCat[0];
         
        //TODO JWT -------------------------------------
        if(sessionUser) {
            // si tout va bien, rajoute l'utilisateur dans la session
        //req.session.user = sessionUser; //TODO voir si on a vraiment plus besoin des sessions ic - ça semble foncitonner sans!
        // pour éviter tout problème, on va supprimer le mdp de la session
        //delete req.session.user.password;
        //delete req.session.user.is_damin;
        //delete req.session.user.email
        console.log(sessionUser);
        const jwtContent = { userId: accountId,
                             catId: sessionUser.id };
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
        req.session.cat = false;
        res.send('cat succesfully disconnected')
        //console.log(req.session.cat);
        // TODO ajouter ici le code qui va gérer l'action une fois que le user est déconnecté 
    }
};
module.exports = catLoginController;