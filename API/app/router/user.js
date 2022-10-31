const { Router } = require('express');
const userController = require('../controller/user');

const router = Router();

/*--------------------------------- user router (create, read, update, delete) : */
    /**
    * POST /user
    * @summary create user
    * @description inserts a new user account into the database
    * @param {string} request.body
    */
    router.post("/user", userController.newUser);

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