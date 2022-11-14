const dataMapper = require("../datamapper/catMessages");

const catMessage = {
    /**
     * sends a message (from cat in cat token) to the human in human id in body
     * 
     * @param {*} req cat token / body: human id (receiver) and message content
     * @param {*} res the written message
     * @returns {JSON} the sent message
     */
    sendMessage: async (req, res) => {
        try {
            const result = await dataMapper.createMessage(req.auth.catId, req.body.receiver_profile_id, req.body.content); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
    /**
     * retrieves the messages of cat in cat token
     * 
     * @param {*} req cat id in cat token 
     * @param {*} res the messages linked to this cat
     * @returns {JSON} array of messages sent to this cat
     */
    getMyMessages: async (req, res) => {
        try {
            const result = await dataMapper.getMessages(req.auth.catId); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    }
}

module.exports = catMessage;