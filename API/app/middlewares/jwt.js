const { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authorizationMiddleware = jwt({ secret: jwtSecret, algorithms: ['HS256'] });


module.exports = authorizationMiddleware;
