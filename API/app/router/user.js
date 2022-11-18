const { Router } = require('express');
const userController = require('../controller/user');
const signupLoginController = require('../controller/signupLogin');
const authorizationMiddleware = require('../middlewares/jwt');
const userLogoutController = require('../controller/userLogout');
//const checkToken = require('../middlewares/checkToken');
 
const router = Router();

/*--------------------------------- user router (create, read, update, delete) : */
    /**
    * POST /user
    * @summary create user
    * @description inserts a new user account into the database / encrypts the password and checks that the email is not already used.
    * @param {string} request.body
    */
    router.post("/user/signup", signupLoginController.signupAction);
    
    /**
    * POST /user/login
    * @summary login user
    * @description lets a user log in, checks the email and the encrupted password in DB.
    * @param {string} request.body
    */
    router.post("/user/login", signupLoginController.loginAction);

    /**
    * GET /user
    * @summary logs out the user
    * @description logs out a user and takes him out of his session.
    */
    router.get("/user/logout", authorizationMiddleware, userLogoutController.disconnect);

    /**
    * GET /user
    * @summary get all users
    * @description retrieves all the user accounts from the database
    */
    router.get("/user", userController.allUsers);

    /**
    * GET /user/:id
    * @summary selects a specific user
    * @description retrieves the user with the id passed in params from database.
    * @param {integer} request.params - id PK
    */
    router.get("/userProfile", authorizationMiddleware, userController.oneUser);

    /**
    * PATCH /user
    * @summary update user
    * @description update an existing user account into the database
    * @param {number} id.path.required - category identifier
    */
    router.patch("/user", authorizationMiddleware, userController.update);

    /**
    * GET /userhumans
    * @summary gets all the human profiles of the user in session
    * @description gets all the owned human profiles of the logged in user. 
    *  - category identifier
    */
    router.get("/userhumans", authorizationMiddleware, userController.getMyHumanProfiles);

    /**
    * GET /user/cats
    * @summary gets all the cat profiles of the user in session
    * @description gets all the owned cat profiles of the logged in user. 
    *  - category identifier
    */
    router.get("/usercats", authorizationMiddleware, userController.getMyCatProfiles);

    /**
    * DELETE /user
    * @summary delete user
    * @description delete an existing user account into the database
    * @param {number} id.path.required - category identifier
    */
    router.delete("/user", authorizationMiddleware, userController.delete);

module.exports = router;