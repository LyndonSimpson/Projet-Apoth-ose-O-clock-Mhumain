const database = require('../../data/database');

const tokenDattaMapper = {
  /**
   * manages the tokens for logged users by checking their state in DB
   * @param {*} user_id owner of token
   * @param {*} token token for logs and logout 
   * @returns empty - status 200
   */
  async store(user_id, token) {
    const query = {
      text: `INSERT INTO user_tokens(account_id, content)
      VALUES($1,$2)`,
      values: [user_id, token]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * gets the token of the user in token
   * @param {*} user_id user id in token
   * @returns user_token
   */
  async get(token) {
    const query = {
        text: `SELECT id FROM user_tokens WHERE content = $1`,
        values: [token]
    };
    const result = await database.query(query);
    return result.rows;
  },
  async delete(token) {
    const query = {
        text: `DELETE FROM user_tokens WHERE content = $1`,
        values: [token]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = tokenDattaMapper;