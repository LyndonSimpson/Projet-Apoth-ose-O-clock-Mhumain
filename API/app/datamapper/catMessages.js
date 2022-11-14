const database = require('../../data/database');

const catMessagesDataMapper = {
    /**
     * sends a new message to a human
     * 
     * @param {*} cat_id sender in cat token
     * @param {*} human_id receiver in body
     * @param {*} content message in body
     * @returns sent message
     */
    async createMessage(cat_id, human_id, content) {
        const query = {
            text: `INSERT INTO cat_has_message(cat_id, human_id, content) 
                  VALUES($1,$2,$3)`,
            values: [cat_id, human_id, content]
          };
        const result = await database.query(query);
        console.log(result);
        return result.rows[0];
    },
    /**
     * retrieves all the messages sent to this cat with the cat id
     * 
     * @param {*} cat_id receiver in cat token
     * @returns all sent messages to this cat
     */
    async getMessages(cat_id) {
        const query = {
            text: `SELECT * FROM human_has_message WHERE cat_id = $1;`,
            values: [cat_id]
          };
        const result = await database.query(query);
        return result.rows;
    }
}

module.exports = catMessagesDataMapper;