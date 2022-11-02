const { Router } = require('express');
const userController = require('../controller/user');
const signupLoginController = require('../controller/signupLogin');
 
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
    * GET /user
    * @summary login user
    * @description lets a user log in, checks the email and the encrupted password in DB.
    * @param {string} request.body
    */
    router.get("/user/login", signupLoginController.loginAction); 

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
    * @param {number} id.path.required - category identifier
    */
    router.get("/user/:id", userController.oneUser);

    /**
    * PATCH /user
    * @summary update user
    * @description update an existing user account into the database
    * @param {number} id.path.required - category identifier
    */
    router.patch("/user/:id", userController.update);

    /**
    * DELETE /user
    * @summary delete user
    * @description delete an existing user account into the database
    * @param {number} id.path.required - category identifier
    */
    router.delete("/user/:id", userController.delete);



module.exports = router;