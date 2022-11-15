const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

 const checkToken =  (req, res, next) => {
    const authcookie = req.cookies.authcookie;
    try {
        jwt.verify(authcookie, jwtSecret, (err, data) => {
            if (err) {
                res.sendStatus(403)
            } else if (data.userId) {
                req.userId = data.userId
                //console.log(data); // - id of logged user or profile
                next()
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
}
module.exports = checkToken;