const dataMapper = require("../datamapper/human");
const jsonwebtoken = require('jsonwebtoken');

const humanLoginController = {
    /**
     * creates a new human profile in DB for user with user token
     * 
     * @param {*} req multipartForm - profile pic and human info
     * @param {*} res the created human, if user passed all the checks
     * @returns {JSON} created human profile
     */
    async signupAction(req, res) {
        const id = req.auth.userId;
        const fakeObject = {};
        try {
            const AlreadyExists = await dataMapper.getMyhumans(id);
            const check = AlreadyExists[0];
            const isEmpty = Object.keys(check || fakeObject).length === 0;
            const searchedHuman = await dataMapper.getOneHumanByPseudo(req.body.pseudo);
            const fakeObject1 = {};
            const check1 = searchedHuman[0];
            const pseudo = check1 || fakeObject1;
            if (pseudo.pseudo == req.body.pseudo) {
                throw new Error("human pseudonyme already exists");
            }
            if (!isEmpty) {
                res.status(500).send('You already have a human profile on this account')
            } else { 
                //console.log(`nouvel humain créé : ${req.body.pseudo}`); - for testing
                //console.log(`nom de sa photo : ${req.file.filename}`); - for testing
                const image_name = req.file.filename;
                const newHuman = await dataMapper.createHuman(req.body.pseudo, image_name, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
                    req.body.description, req.body.age,
                    req.body.has_pets, req.body.has_kids, req.body.has_garden,
                    req.auth.userId);
                const searchedHuman1 = await dataMapper.getOneHumanByPseudo(req.body.pseudo);
                res.json(searchedHuman1);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
    /**
     * logs in as cat to get a human token
     * 
     * @param {*} req user token / body: human pseudo
     * @param {*} res human 'session' with human token || errors
     * @returns {JSON} logged human and human token
     */
    async loginAction(req, res) {
        const accountId = req.auth.userId;
        const jwtSecret = process.env.JWT_SECRET;
        try {
            const searchedHuman = await dataMapper.getOneHumanByPseudo(req.body.pseudo);

            if (!searchedHuman) {
                throw new Error("Login does not work, pseudo does not exist");
            }
            const sessionUser = searchedHuman[0];
            //JWT -------------------------------------
            if (sessionUser) {
                const jwtContent = {
                    userId: accountId,
                    humanId: sessionUser.id
                };
                const jwtOptions = {
                    algorithm: 'HS256',
                    expiresIn: '3h'
                };
                console.log('<< 200 hooman logged in');
                res.json({
                    logged: true,
                    pseudo: sessionUser.name,
                    token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
                });
            } else {
                console.log('<< 401 UNAUTHORIZED');
                res.sendStatus(401);
            }

        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
    /**
     * disconencts the cat in client human token
     * 
     * @param {*} req human token
     * @param {*} res empty array
     * @returns {JSON} empty
     */
    disconnect(req, res) {
        req.session.human = false;
        res.send('human succesfully disconnected')
        // TODO ajouter ici le code qui va gérer l'action une fois que le user est déconnecté 
    }
};
module.exports = humanLoginController;