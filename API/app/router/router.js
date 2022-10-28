const { Router } = require('express');
const userController = require('../controller/user');

const router = Router();


    /**
    * POST /user
    * @summary create user
    * @description inserts a new user account into the database
    * @param {string} request.body
    */
    router.post("/user", userController.newUser);

    /**
    * PATCH /user
    * @summary update user
    * @description update an existing user account into the database
    */
     router.patch("/user/:id", userController.update);

    /**
    * DELETE /user
    * @summary update user
    * @description update an existing user account into the database
    * @param {Number} req.params.id
    */
    router.delete("/user/:id", userController.delete);




module.exports = router;