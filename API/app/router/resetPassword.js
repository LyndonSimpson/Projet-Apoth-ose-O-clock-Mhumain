const {
    Router
} = require('express');
const tokenController = require('../controller/resetToken'); // insert here when token controller is ready.

const router = Router();

/**
 * POST /generateMail
 */
router.post("/generateMail", tokenController.sendMessage); // route where generates the link and email etc / posts the email of user

/**
 * POST /resetPassword/:userId/:token
 */
router.post("/resetPassword/:userId/:token", tokenController.resetPassword); // route where user gets to a update method to change only password (use hash like on normal update)


module.exports = router;