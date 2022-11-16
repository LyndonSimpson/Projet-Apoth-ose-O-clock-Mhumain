const database = require('../../data/database');

const humanMessagesDataMapper = {
    /**
     * 
     * @param {*} human_id 
     * @param {*} cat_id 
     * @param {*} author 
     * @param {*} content 
     * @returns 
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
     * 
     * @param {*} human_id 
     * @param {*} cat_id 
     * @returns 
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