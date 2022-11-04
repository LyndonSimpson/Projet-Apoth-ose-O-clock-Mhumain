const { Router } = require('express');
const humanController = require('../controller/human');
const humanLoginController = require('../controller/humanLogin');
const authorizationMiddleware = require('../middlewares/jwt');

const router = Router();


//TODO this router needs to have a "connected_user" middleware to filter connected user to have access :
/*--------------------------------- human router (create, read, update, delete) : */
    
    /**
    * POST /human create
    * @summary create human
    * @description inserts a new human profile into the database
    * @param {string} request.body
    */
    router.post("/human/signup", humanLoginController.signupAction); 

    /**
    * POST /human login
    * @summary human login
    * @description login as a human
    */
    router.post("/human/login", humanLoginController.loginAction);

    /**
    * get /human logout
    * @summary human logout
    * @description disconnect a human from the session
    */
     router.get("/human/logout", humanLoginController.disconnect);

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
    router.patch("/human/:id", humanController.update); 
 
    /**
    * DELETE /human
    * @summary delete human profile
    * @description delete an existing human profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.delete("/human/:id", humanController.delete);
 
 
module.exports = router;