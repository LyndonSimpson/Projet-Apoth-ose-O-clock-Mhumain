const tokenDataMapper = require('../datamapper/passToken');
const userDataMapper = require('../datamapper/user');
const sendEmail = require("../utils/sendResetMail");
const Joi = require("joi");
const crypto = require("crypto");
const bcrypt = require('bcrypt');

const resetPassword = {
    sendMessage: async (req, res) => {
        try {
            const schema = Joi.object({ email: Joi.string().email().required() });
            const { error } = schema.validate(req.body);
            if (error) return res.status(400).send(error.details[0].message);
    
            const info = await userDataMapper.getOneUserByEmail(req.body.email);
            const user = info[0];
            console.log(user, '--------------------> user');
            if (!user)
                return res.status(400).send("user with given email doesn't exist");
    
            let token1 = await tokenDataMapper.get(user.id);
            const token = token1[0];
            console.log(token, '--------------------------> token');
            if (!token) {
                const token2 = crypto.randomBytes(32).toString("hex");
                token = await tokenDataMapper.store(user.id, token2);
            }
    
            const link = `${process.env.BASE_URL}/password-reset/${user.id}/${token.token}`;
            await sendEmail(user.email, "Password reset", link);
    
            res.send("password reset link sent to your email account");
        } catch (error) {
            res.send("An error occured");
            console.log(error);
        }
    },
    resetPassword: async (req, res) => {
        try {
            const schema = Joi.object({ password: Joi.string().required() });
            const { error } = schema.validate(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            
            const passwordConfirm = req.body.passwordConfirm;
            if (passwordConfirm != req.body.password) return res.status(400).send('validate password did not match password')

            const info = await userDataMapper.getUserById(req.params.userId); // retrieves only email !
            const user = info[0];
            console.log(user, '----------------- WE ARE IN reset password, bofire store token');
            if (!user) return res.status(400).send("invalid link or expired");
            
            const id = req.params.userId;

            const token = await tokenDataMapper.store(id, req.params.token);
            if (!token) return res.status(400).send("Invalid link or expired");
    
            const password = req.body.password;

            const encryptedMsg = bcrypt.hashSync(password, 10);
            const result = await userDataMapper.updateUserPassword(encryptedMsg, id);

            const deleteToken = await tokenDataMapper.delete(id)

            res.send("password reset sucessfully.");
        } catch (error) {
            res.send("An error occured");
            console.log(error);
        }
    }
}

module.exports = resetPassword;