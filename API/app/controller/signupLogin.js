const dataMapper = require("../datamapper/user");
//const tokenDataMapper = require('../datamapper/storeToken'); ---- changed the tokendataMapper - repurposed for reset password.
const emailValidator = require('email-validator');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {
    /**
     * creates a new user acount, checks i user mail already exists, encrypts password and returns created account
     * 
     * @param {*} req body: email, password, passworConfirm
     * @param {*} res pseudo of created user account
     * @returns {JSON} just a pseudonyme
     */
    async signupAction(req, res) {
        try {
            const searchedUser = await dataMapper.getOneUserByEmail(req.body.email);
            const fakeObject = {};
            const check = searchedUser[0];
            const email = check || fakeObject;
            if (email.email == req.body.email) {
                throw new Error("Email already exists");
            }
            if (!emailValidator.validate(req.body.email)) {
                throw new Error("Email format is not valid");
            }
            if (req.body.password !== req.body.passwordConfirm) {
                throw new Error("Password and confirmed Password does not match");
            }
            const encryptedMsg = bcrypt.hashSync(req.body.password, 10);
            const newUser = await dataMapper.createUser(req.body.email, encryptedMsg);
            const searchedUser1 = await dataMapper.getOneUserByEmail(req.body.email);
            let userObject = searchedUser1[0];
            userObject.password = false;
            userObject.is_admin = false;
            userObject.id = false;
            const str = userObject.email;
            const nameMatch = str.match(/^([^@]*)@/);
            const pseudo = nameMatch ? nameMatch[1] : null;
            res.json(pseudo);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
    /**
     * logs in an existing user if email and password check pass: to get a user token
     * 
     * @param {*} req body: email, password
     * @param {*} res logged in user account with user token
     * @returns {JSON} user token in user account info json
     */
    async loginAction(req, res) {
        const jwtSecret = process.env.JWT_SECRET;
        try {
            const searchedUser = await dataMapper.getOneUserByEmail(req.body.email);
            if (!searchedUser) {
                throw new Error("Login does not work, email or password invalid");
            }
            const pass = req.body.password;
            const hash = searchedUser.map(x => x.password);
            const hash2 = hash[0];
            const sessionUser = searchedUser[0];
            const validPwd = await bcrypt.compare(pass, hash2);
            if (!validPwd) {
                throw new Error("Login does not work, email or password invalid");
            }
            sessionUser.password = false;
            //JWT -------------------------------------
            if (sessionUser) {
                const jwtContent = {
                    userId: sessionUser.id
                };
                const jwtOptions = {
                    algorithm: 'HS256',
                    expiresIn: '3h'
                };
                const user_id = sessionUser.id
                const str = sessionUser.email;
                const nameMatch = str.match(/^([^@]*)@/);
                const pseudo = nameMatch ? nameMatch[1] : null;
                const jwt = jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions);
                const jwt1 = `Bearer ${jwt}`;
                //const storeToken = await tokenDataMapper.store(user_id, jwt1); //---------------------- to store token in DB ! not working for front
                console.log('<< 200 user logged in');
                res.json({
                    logged: true,
                    pseudo: pseudo,
                    token: jwt,
                });
            } else {
                console.log('<< 401 UNAUTHORIZED');
                res.sendStatus(401);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    }
};
module.exports = userController;