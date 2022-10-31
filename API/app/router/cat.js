const { Router } = require('express');
const catController = require('../controller/cat');

const router = Router();


//TODO this router needs to have a "connected_user" middleware to filter connected user to have access :
/*--------------------------------- cat router (create, read, update, delete) : */
    /**
    * POST /cat
    * @summary create cat
    * @description inserts a new cat profile into the database
    * @param {string} request.body
    */
    router.post("/cat", catController.newCat);

    /**
    * GET /cat
    * @summary get all cats
    * @description retrieves all the cat profiles from the database
    */
    router.get("/cat", catController.allCats);
 
    /**
    * GET /cat/:id
    * @summary selects a specific cat
    * @description retrieves the cat with the id passed in params from database.
    * @param {number} id.path.required - category identifier
    */
    router.get("/cat/:id", catController.oneCat);
 
    /**
    * PATCH /cat
    * @summary update cat profile
    * @description update an existing cat profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.patch("/cat/:id", catController.update);  // enlever le is_adopted si on fait une route patch dédiée à patch seulement le "is_adopted" et le "owner_id"

    /**
    * PATCH /cat/:id
    * @summary adopts a specific cat
    * @description adopts the cat with the id passed in params from database. the cat now is adopted and has an owner.
    * @param {number} id.path.required - category identifier
    */
    router.patch("/cat/:id", catController.adoptCat);
 
    /**
    * DELETE /cat
    * @summary delete cat profile
    * @description delete an existing cat profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.delete("/cat/:id", catController.delete);
 
 
module.exports = router;