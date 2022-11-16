const { Router } = require('express');
const humanController = require('../controller/human');
const humanLoginController = require('../controller/humanLogin');
const authorizationMiddleware = require('../middlewares/jwt');
const humanSearchController = require('../controller/humanSearch');
//const sendMailController = require('../controller/nodeMailer');
const humanMessageController = require('../controller/humanMessage');

const multer = require('multer');
const storage = require('../middlewares/storage');

const router = Router();


//TODO this router needs to have a "connected_user" middleware to filter connected user to have access :
/*--------------------------------- human router (create, read, update, delete) : */
    
const upload = multer({
    storage: storage,
})  
//todo = pour les tests, à supprimer après
    /**
    * POST /human create
    * @summary create human
    * @description inserts a new human profile into the database
    * @param {string} request.body
    */
     router.post("/human", authorizationMiddleware, upload.single("fileUpload"), humanController.newHuman);    

    /**
    * POST /human create
    * @summary create human
    * @description inserts a new human profile into the database
    * @param {string} request.body
    */
    router.post("/human/signup", authorizationMiddleware, upload.single("fileUpload"), humanLoginController.signupAction); 

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
    * GET /human/
    * @summary selects a specific human
    * @description retrieves the human with the id passed in params from database.
    * @param {number} id.path.required - category identifier
    */
    router.get("/humanProfile", authorizationMiddleware, humanController.oneHuman);
 
    /**
    * PATCH /human
    * @summary update human profile
    * @description update an existing human profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.patch("/humanupdate", authorizationMiddleware, humanController.update); 

    /**
    * PATCH /human
    * @summary update human profile
    * @description update an existing human profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
     router.patch("/humanupdateImage", authorizationMiddleware, upload.single("fileUpload"), humanController.updateImage);
 
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
    
    /**
    * GET /human random 5
    * @summary ranom 5 human profile
    * @description get 5 random human profiles
    */
    router.get("/humanRandom", authorizationMiddleware, humanController.Humans5);

    router.post("/sendhumanmessages", authorizationMiddleware, humanMessageController.sendMessage);
    router.post("/gethumanmessages", authorizationMiddleware, humanMessageController.getMyMessages);
 
module.exports = router;