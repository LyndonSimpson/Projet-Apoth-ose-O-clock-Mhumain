const { Router } = require('express');
const catController = require('../controller/cat');
const catLoginController = require('../controller/catLogin.js');
const authorizationMiddleware = require('../middlewares/jwt');
const catSearchController = require('../controller/catSearch');
const factController = require('../controller/frenchCatFact');
const multer = require('multer');
const storage = require('../middlewares/storage');

const router = Router();


//TODO this router needs to have a "connected_user" middleware to filter connected user to have access :
/*--------------------------------- cat router (create, read, update, delete) : */
    
const upload = multer({
    storage: storage,
})
//todo = pour les tests, à supprimer après
    /**
    * POST /cat/signup
    * @summary create cat
    * @description inserts a new cat profile into the database
    * @param {string} request.body
    */
    router.post("/cat", authorizationMiddleware, upload.single("fileUpload"), catController.newCat); //TODO ne pas utiliser cette route. pour le tests de multer.
    
    /**
    * POST /cat/signup
    * @summary create cat
    * @description inserts a new cat profile into the database
    * @param {string} request.body
    */
    router.post("/cat/signup", authorizationMiddleware, upload.single("fileUpload"), catLoginController.signupAction); 

    /**
    * POST /cat/login
    * @summary get all cats
    * @description let's the user with a session.user log in on his selected cat profile
    * @param {string} request.body
    */
    router.post("/cat/login", authorizationMiddleware, catLoginController.loginAction);

    /**
    * GET /cat/logout
    * @summary get all cats
    * @description let's the user with a session.user log in on his selected cat profile
    */
    router.get("/cat/logout", authorizationMiddleware, catLoginController.disconnect);

    /**
    * GET /cat login
    * @summary login as a cat - miaow
    * @description retrieves all the cat profiles from the database
    */
    router.get("/cat", authorizationMiddleware, catController.allCats);
 
    /**
    * GET /cat/:id
    * @summary selects a specific cat
    * @description retrieves the cat with the id passed in params from database.
    * @param {number} request.params - id PK
    */
    router.get("/cat/:id", catController.oneCat);

    /**
    * GET /adoptedcats/:id
    * @summary selects a specific cat
    * @description retrieves the cat with the id passed in params from database.
    * @param {number} id.path.required - category identifier
    */
    router.get("/adoptedcats", catController.getAdoptedCats);
 
    /**
    * PATCH /cat
    * @summary update cat profile
    * @description update an existing cat profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.patch("/catupdate", authorizationMiddleware, upload.single("fileUpload"), catController.update);  // enlever le is_adopted si on fait une route patch dédiée à patch seulement le "is_adopted" et le "owner_id"

    /**
    * PATCH /cat/:id
    * @summary adopts a specific cat
    * @description adopts the cat with the id passed in params from database. the cat now is adopted and has an owner.
    * @param {number} id.path.required - category identifier
    */
    router.patch("/catadopt/:id", authorizationMiddleware, catController.adoptCat);
 
    /**
    * DELETE /cat
    * @summary delete cat profile
    * @description delete an existing cat profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
    router.delete("/cat", authorizationMiddleware, catController.delete);

    /**
    * POST /catsearch
    * @summary delete cat profile
    * @description delete an existing cat profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
     router.post("/catsearch", authorizationMiddleware, catSearchController.search);
    
    /**
    * GET /catsearch
    * @summary delete cat profile
    * @description delete an existing cat profile into the database with id passed in params
    * @param {number} id.path.required - category identifier
    */
     router.get("/catfact", factController.frenchFact);
 
 
module.exports = router;