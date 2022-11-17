const {
    Router
} = require('express');
const catController = require('../controller/cat');
const catLoginController = require('../controller/catLogin.js');
const authorizationMiddleware = require('../middlewares/jwt');
const catSearchController = require('../controller/catSearch');
const factController = require('../controller/frenchCatFact');
const catMessageController = require('../controller/catMessage');
//const sendMailController = require('../controller/nodeMailer');
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
 * POST /cat
 * @summary create cat
 * @description inserts a new cat profile into the database
 * @param {request} request.body
 */
router.post("/cat", authorizationMiddleware, upload.single("fileUpload"), catController.newCat); //TODO ne pas utiliser cette route. pour le tests de multer.

/**
 * POST /cat/signup
 * @summary create cat
 * @description inserts a new cat profile into the database
 * @param {request} request.body
 */
router.post("/cat/signup", authorizationMiddleware, upload.single("fileUpload"), catLoginController.signupAction);

/**
 * POST /cat/login
 * @summary login as a cat
 * @description lets the user login as a cat
 * @param {request} request.body
 */
router.post("/cat/login", authorizationMiddleware, catLoginController.loginAction);

/**
 * GET /cat/logout
 * @summary disconnect logged cat
 * @description let's the user with a session.user log in on his selected cat profile
 */
router.get("/cat/logout", authorizationMiddleware, catLoginController.disconnect);

/**
 * GET /cat 
 * @summary get all the cats from DB
 * @description retrieves all the cat profiles from the database
 */
router.get("/cat", authorizationMiddleware, catController.allCats);

/**
 * GET /catProfile
 * @summary selects a specific cat profile
 * @description retrieves the cat with the id passed in 
 */
router.get("/catProfile", authorizationMiddleware, catController.oneCat);

/**
 * GET /adoptedcats
 * @summary gets all the adopted cats
 * @description gets all the adopted cats from DB
 */
router.get("/adoptedcats", catController.getAdoptedCats);

/**
 * PATCH /catupdate
 * @summary update cat profile
 * @description update an existing cat profile in cat token
 * @param {request} request.body
 */
router.patch("/catupdate", authorizationMiddleware, catController.update);

/**
 * PATCH /catupdateImage
 * @summary update cat profile
 * @description update an existing cat profile (only img) in token
 * @param {request} request.body
 */
router.patch("/catupdateImage", authorizationMiddleware, upload.single("fileUpload"), catController.updateImage);

/**
 * PATCH /catadopt
 * @summary adopts a specific cat
 * @description adopts the cat with the id passed in body from database. the cat now is adopted and has an owner.
 * @param {request} request.body
 */
router.patch("/catadopt", authorizationMiddleware, catController.adoptCat);

/**
 * DELETE /cat
 * @summary delete cat profile
 * @description delete an existing cat profile into the database with id passed in token
 */
router.delete("/cat", authorizationMiddleware, catController.delete);

/**
 * POST /catsearch
 * @summary search for specific cats with filter params
 * @description search filters : sexe and if needs_garden
 * @param {request} request.body
 */
router.post("/catsearch", authorizationMiddleware, catSearchController.search);

/**
 * GET /catfact
 * @summary to translate catFact to french (need paid API for production)
 * @description translates the cat fact from the external cat fact API
 */
router.get("/catfact", factController.frenchFact);

/**
 * GET /catRandom
 * @summary gets 5 random cats from the DB
 * @description get 5 random cat profiles from DB
 */
router.get("/catRandom", authorizationMiddleware, catController.cats5);

/**
 * GET /sendcatmessages
 * @summary sends a message to a human
 * @description sends a message to a human with pseudonyme, opens conversation.
 * @param {request} request.body
 */
router.post("/sendcatmessages", authorizationMiddleware, catMessageController.sendMessage);

/**
 * GET /getcatmessages
 * @summary gets all the conversation of messages between this cat and a selected human
 * @description sends back all of the messages from conversation signed by author and ordered with most recent as last
 * @param {request} request.body
 */
router.post("/getcatmessages", authorizationMiddleware, catMessageController.getMyMessages);

/**
 * GET /catcontacts
 * @summary gets contacts
 * @description get get contacts
 */
 router.get("/catcontacts", authorizationMiddleware, catMessageController.getMyPals);


module.exports = router;