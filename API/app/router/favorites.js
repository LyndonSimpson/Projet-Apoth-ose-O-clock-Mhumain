const { Router } = require('express');
const favoritesController = require('../controller/favorites');

const router = Router();

/*--------------------------------- favorites router (create, read, update, delete) : */
    /**
    * POST /favorites
    * @summary creates a favorite between a cat and a human
    * @description inserts a favorite relationship into the database
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