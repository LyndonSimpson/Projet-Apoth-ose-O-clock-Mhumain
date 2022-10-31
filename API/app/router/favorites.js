const { Router } = require('express');
const favoritesController = require('../controller/favorites');

const router = Router();

/*--------------------------------- favorites router (create, read, update not needed, delete) : */
    /**
    * POST /favorites
    * @summary creates a favorite between a cat and a human
    * @description inserts a favorite relationship into the database
    * @param {string} request.body
    */
    router.post("/favorites", favoritesController.newFavorite);

    /**
    * GET /favorites
    * @summary get all favorites on a profile
    * @description retrieves all the favorites of a profile from the database / an ID (the connected PROFILE_ID, not account) needs to be passed (hidden) to know who the favorites belong to!
    */
    router.get("/favorites", favoritesController.allFavorites);

     /**
     * GET /favorite/:id
     * @summary selects a specific favorite 
     * @description retrieves the favorite with the id passed in params from database. / an ID (the connected PROFILE_ID, not account) needs to be passed (hidden) to know who the favorites belong to!
     * @param {number} id.path.required - category identifier
     */
    router.get("/favorites/:id", favoritesController.oneFavorite);

    /**
    * DELETE /favorite
    * @summary delete favorite
    * @description delete an existing favorite profile from the database
    * @param {number} id.path.required - category identifier
    */
    router.delete("/user/:id", favoritesController.delete);



module.exports = router;