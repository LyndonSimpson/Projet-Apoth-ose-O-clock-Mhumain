const { Router } = require('express');
const humanFavoritesController = require('../controller/humanFavorites');

const router = Router();

/*--------------------------------- favorites router (create, read, update not needed, delete) : */
    /**
    * POST /favorites
    * @summary creates a favorite between a cat and a human
    * @description inserts a favorite relationship into the database
    * @param {string} request.body
    */
    router.post("/favorites", humanFavoritesController.newFavorite);

    /**
    * GET /favorites
    * @summary get all favorites on a profile
    * @description retrieves all the favorites of a profile from the database / an ID (the connected PROFILE_ID, not account) needs to be passed (hidden) to know who the favorites belong to!
    */
    router.get("/favorites", humanFavoritesController.allFavorites);


    // no route for getOnFavorite -- getHumanById and getCatById already do this in their respective routers.

    
    /**
    * DELETE /favorite
    * @summary delete favorite
    * @description delete an existing favorite profile from the database
    * @param {number} id.path.required - category identifier
    */
    router.delete("/favorites/:id", humanFavoritesController.delete);



module.exports = router;