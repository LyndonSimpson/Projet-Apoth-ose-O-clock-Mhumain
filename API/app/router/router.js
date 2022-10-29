const { Router } = require('express');
const userController = require('../controller/user');
const humanController = require('../controller/human');

const router = Router();

/*--------------------------------- user router (create, update, delete) : */
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
     router.get("/user", userController.allusers);

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
    * @summary update user
    * @description update an existing user account into the database
    * @param {number} id.path.required - category identifier
    */
    router.delete("/user/:id", userController.delete);


/*--------------------------------- human router (create, read, update, delete) : */
/*--------------------------------- this router needs to be protected/accessed through connecte_user_middleware */

    /**
    * POST /human
    * @summary create human
    * @description inserts a new human profile into the database
    * @param {string} request.body
    */
    router.post("/human", humanController.newHuman);

    /**
    * GET /human
    * @summary get all humans
    * @description retrieves all the human profiles from the database
    */
    router.get("/human", humanController.allHumans);

    /**
    * GET /human/:id
    * @summary selects a specific human
    * @description retrieves the human with the id passed in params from database.
    * @param {number} id.path.required - category identifier
    */
    router.get("/human/:id", humanController.oneHuman);

    /**
    * PATCH /human
    * @summary update huma profile
    * @description update an existing human profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.patch("/human/:id", humanController.update); //TODO -- seule route que je n'ai pas encore testée

    /**
    * DELETE /human
    * @summary update huma profile
    * @description update an existing human profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.delete("/human/:id", humanController.delete);


module.exports = router;