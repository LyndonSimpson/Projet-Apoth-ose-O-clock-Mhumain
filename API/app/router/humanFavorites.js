const { Router } = require('express');
const humanFavoritesController = require('../controller/humanFavorites');
const authorizationMiddleware = require('../middlewares/jwt');

const router = Router();

/*--------------------------------- favorites router (create, read, update not needed, delete) : */
    /**
    * POST /favorites
    * @summary creates a favorite between a cat and a human
    * @description inserts a favorite relationship into the database
    * @param {string} request.body
    */
    router.post("/humanfavorites", authorizationMiddleware, humanFavoritesController.newFavorite);

    /**
    * GET /favorites
    * @summary get all favorites on a profile
    * @description retrieves all the favorites of a profile from the database / an ID (the connected PROFILE_ID, not account) needs to be passed (hidden) to know who the favorites belong to!
    */
    router.get("/humanfavorites", authorizationMiddleware, humanFavoritesController.allFavorites);

    // no route for getOnFavorite -- getHumanById and getCatById already do this in their respective routers.

    /**
    * GET /favorite
    * @summary delete favorite
    * @description delete an existing favorite profile from the database
    * @param {number} id.path.required - category identifier
    */
     router.get("/humanfavcheck", authorizationMiddleware, humanFavoritesController.isCatInFavorites);

    /**
    * DELETE /favorite
    * @summary delete favorite
    * @description delete an existing favorite profile from the database
    * @param {number} id.path.required - category identifier
    */
    router.delete("/humanfavorites", authorizationMiddleware, humanFavoritesController.delete);



module.exports = router;