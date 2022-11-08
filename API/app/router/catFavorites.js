const { Router } = require('express');
const catFavoritesController = require('../controller/catFavorites');
const authorizationMiddleware = require('../middlewares/jwt');

const router = Router();

/*--------------------------------- favorites router (create, read, update not needed, delete) : */
    /**
    * POST /favorites
    * @summary creates a favorite between a cat and a human
    * @description inserts a favorite relationship into the database
    * @param {string} request.body
    */
    router.post("/catfavorites", authorizationMiddleware, catFavoritesController.newFavorite);

    /**
    * GET /favorites
    * @summary get all favorites on a profile
    * @description retrieves all the favorites of a profile from the database / an ID (the connected PROFILE_ID, not account) needs to be passed (hidden) to know who the favorites belong to!
    */
    router.get("/catfavorites", authorizationMiddleware, catFavoritesController.allFavorites);


    // no route for getOnFavorite -- getHumanById and getCatById already do this in their respective routers.

    
    /**
    * DELETE /favorite
    * @summary delete favorite
    * @description delete an existing favorite profile from the database
    * @param {number} id.path.required - category identifier
    */
    router.delete("/catfavorites/:id", authorizationMiddleware, catFavoritesController.delete);



module.exports = router;