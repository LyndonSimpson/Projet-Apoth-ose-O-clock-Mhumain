const tokenDataMapper = require('../datamapper/storeToken');
const { expressjwt: jwt } = require("express-jwt");
const jwtSecret = process.env.JWT_SECRET;

const userLogout = {
    /**
     * disconnects the user /// still testing
     * @param {*} req user id to disconnect
     * @param {*} res empty
     * @returns empty - status 200
     */
     async disconnect(req, res) {
         console.log(req);
        jwt({ secret: jwtSecret, algorithms: ['HS256'] });
        console.log(req);
        const id = req.auth.userId;
        const check = await tokenDataMapper.get(id);

        res.send('succesfully disconnected')
    }
}

module.exports = userLogout;