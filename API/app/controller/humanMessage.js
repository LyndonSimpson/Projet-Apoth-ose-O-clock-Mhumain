const dataMapper = require("../datamapper/humanMessages");

const humanMessage = {
    /**
     * sends a message (from human in human token) to the cat in cat id in body
     * 
     * @param {*} req human token / body: cat id (receiver) and message content
     * @param {*} res the written message
     * @returns {JSON} the sent message
     */
    sendMessage: async (req, res) => {
        try {
            const result = await dataMapper.createMessage(req.auth.humanId, req.body.receiver_profile_id, req.body.content); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    },
    /**
     * retrieves the messages of human in human token
     * 
     * @param {*} req human id in cat token 
     * @param {*} res the messages linked to this human
     * @returns {JSON} array of messages sent to this human
     */
    getMyMessages: async (req, res) => {
        try {
            const result = await dataMapper.getMessages(req.auth.humanId); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
    }
}

module.exports = humanMessage;