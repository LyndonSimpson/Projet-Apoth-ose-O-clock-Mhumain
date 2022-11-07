const { Router } = require('express');
const humanController = require('../controller/human');
const humanLoginController = require('../controller/humanLogin');
const authorizationMiddleware = require('../middlewares/jwt');
const humanSearchController = require('../controller/humanSearch');

const router = Router();


//TODO this router needs to have a "connected_user" middleware to filter connected user to have access :
/*--------------------------------- human router (create, read, update, delete) : */
    
    /**
    * POST /human create
    * @summary create human
    * @description inserts a new human profile into the database
    * @param {string} request.body
    */
    router.post("/human/signup", authorizationMiddleware, humanLoginController.signupAction); 

    /**
    * POST /human login
    * @summary human login
    * @description login as a human
    */
    router.post("/human/login", authorizationMiddleware, humanLoginController.loginAction);

    /**
    * get /human logout
    * @summary human logout
    * @description disconnect a human from the session
    */
     router.get("/human/logout", authorizationMiddleware, humanLoginController.disconnect);

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
    * @summary update human profile
    * @description update an existing human profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.patch("/human", authorizationMiddleware, humanController.update); 
 
    /**
    * DELETE /human
    * @summary delete human profile
    * @description delete an existing human profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.delete("/human", authorizationMiddleware, humanController.delete);

    /**
    * POST /humansearch
    * @summary search human profiles
    * @description delete an existing cat profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.post("/humansearch", authorizationMiddleware, humanSearchController.search);
 
 
module.exports = router;