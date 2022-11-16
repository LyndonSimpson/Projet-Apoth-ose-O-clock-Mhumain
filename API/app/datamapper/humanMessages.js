const database = require('../../data/database');

const humanMessagesDataMapper = {
    /**
     * sends a new message to a cat
     * 
     * @param {*} human_id sender in human token
     * @param {*} cat_id receiver in body
     * @param {*} content message in body
     * @returns sent message
     */
    async createMessage(human_id, cat_id, content) {
        const query = {
            text: `INSERT INTO human_has_message(human_id, cat_id, content) 
                  VALUES($1,$2,$3)`,
            values: [human_id, cat_id, content]
          };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * retrieves all the messages sent to this human with the cat id
     * 
     * @param {*} human_id receiver in human token
     * @returns all sent messages to this human
     */
    async getMessages(human_id) {
        const query = {
            text: `SELECT * FROM cat_has_message WHERE human_id = $1;`,
            values: [human_id]
          };
        const result = await database.query(query);
        return result.rows;
    }
}

module.exports = humanMessagesDataMapper;