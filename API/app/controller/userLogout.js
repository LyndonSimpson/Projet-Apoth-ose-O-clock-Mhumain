//const tokenDataMapper = require('../datamapper/storeToken'); -------- changed the name - repurposed for reset password tokens
const {
    expressjwt: jwt
} = require("express-jwt");
const jwtSecret = process.env.JWT_SECRET;

const userLogout = {
    /**
     * disconnects the user /// still testing
     * @param {*} req user id to disconnect
     * @param {*} res empty
     * @returns empty - status 200
     */
    async disconnect(req, res) {
        const token = req.headers.authorization || 'faketoken';
        const check = await tokenDataMapper.get(token);
        const bolean = check[0] || null;
        if (!bolean) {
            res.send('no user logged in');
        } else if (bolean) {
            const deleteToken = await tokenDataMapper.delete(token);
            res.send('user successfully logged out');
        }
    }
}

module.exports = userLogout;