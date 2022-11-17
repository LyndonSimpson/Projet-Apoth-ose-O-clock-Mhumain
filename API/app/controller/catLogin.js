const dataMapper = require("../datamapper/cat");
const jsonwebtoken = require('jsonwebtoken');

const catLoginController = {
    /**
     * creates a new cat profile in DB for user with user token
     * 
     * @param {*} req multipartForm - profile pic and cat info
     * @param {*} res the created cat, if user passed all the checks
     * @returns {JSON} created cat profile
     */
    async signupAction(req, res) {
        try {
            const searchedCat = await dataMapper.getOneCatByPseudo(req.body.pseudo);
            const fakeObject = {};
            const check = searchedCat[0];
            const pseudo = check || fakeObject;
            if (pseudo.pseudo == req.body.pseudo) {
                throw new Error("cat pseudonyme already exists");
            }
            //console.log(`nouveau chat créé : ${req.body.pseudo}`); - for testing
            //console.log(`nom de sa photo : ${req.file.filename}`); - for testing 
            const image_name = req.file.filename;
            const newCat = await dataMapper.createCat(req.body.pseudo, image_name, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
                req.body.description, req.body.race, req.body.age, req.body.sexe,
                req.body.color,
                req.body.likes_pets, req.body.likes_kids, req.body.needs_garden,
                req.body.siblings_id,
                req.auth.userId);
            const searchedCat1 = await dataMapper.getOneCatByPseudo(req.body.pseudo);
            res.json(searchedCat1);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
    /**
     * logs in as cat to get a cat token
     * 
     * @param {*} req user token / body: cat pseudo
     * @param {*} res cat 'session' with cat token || errors
     * @returns {JSON} logged cat and cat token
     */
    async loginAction(req, res) {
        const jwtSecret = process.env.JWT_SECRET;
        const accountId = req.auth.userId;
        try {
            const searchedCat = await dataMapper.getOneCatByPseudo(req.body.pseudo);
            if (!searchedCat) {
                throw new Error("Login does not work, pseudo does not exist");
            }
            const sessionUser = searchedCat[0];
            //JWT -------------------------------------
            if (sessionUser) {
                const jwtContent = {
                    userId: accountId,
                    catId: sessionUser.id
                };
                const jwtOptions = {
                    algorithm: 'HS256',
                    expiresIn: '3h'
                };
                console.log('<< 200 cat logged in');
                res.json({
                    logged: true,
                    pseudo: sessionUser.pseudo,
                    isAdopted: sessionUser.is_adopted,
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
     * disconencts the cat in client cat token
     * 
     * @param {*} req cat token
     * @param {*} res empty array
     * @returns {JSON} empty
     */
    disconnect(req, res) {
        req.session.cat = false;
        res.send('cat succesfully disconnected');
    }
};
module.exports = catLoginController;