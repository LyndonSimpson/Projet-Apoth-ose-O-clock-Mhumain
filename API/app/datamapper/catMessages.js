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
  async createMessage(cat_id, human_id, author, content) {
    const query = {
      text: `INSERT INTO conversation(cat_id, human_id, author, message) 
                  VALUES($1,$2,$3,$4)`,
      values: [cat_id, human_id, author, content]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * retrieves all the messages sent to this cat with the cat id
   * 
   * @param {*} cat_id receiver in cat token
   * @returns all sent messages to this cat
   */
  async getMessages(cat_id, human_id) {
    const query = {
      text: `SELECT message, author FROM conversation WHERE cat_id = $1 AND human_id = $2 ORDER BY created_at ASC;`,
      values: [cat_id, human_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * retrieves all the humans with wich the cat has spoken or that adressed this cat
   * 
   * @param {*} cat_id cat_id in token
   * @returns 
   */
  async getContacts(cat_id) {
    const query = {
      text: `SELECT * FROM human WHERE id in (
            SELECT human_id FROM conversation WHERE cat_id = $1
          )`,
      values: [cat_id]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = catMessagesDataMapper;