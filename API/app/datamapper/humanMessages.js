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
    async createMessage(human_id, cat_id, author, content) {
        const query = {
            text: `INSERT INTO conversation(cat_id, human_id, author, message) 
            VALUES($1,$2,$3,$4)`,
            values: [cat_id, human_id, author, content]
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
    async getMessages(human_id, cat_id) {
        const query = {
            text: `SELECT message, author FROM conversation WHERE cat_id = $1 AND human_id = $2 ORDER BY created_at DESC;`,
            values: [cat_id, human_id]
          };
        const result = await database.query(query);
        return result.rows;
    }
}

module.exports = humanMessagesDataMapper;