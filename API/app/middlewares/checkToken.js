const tokenDataMapper = require('../datamapper/storeToken');

/**
 * checks if the token that the user has is still in DB (not logged out)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const checkToken = async (req, res, next) => {
    const token = req.headers.authorization || 'faketoken';
    const check = await tokenDataMapper.get(token);
    const bolean = check[0] || null;
    if (!bolean) {
        return res.send('you are not logged in');
    } else {
        next();
    }
};

module.exports = checkToken;