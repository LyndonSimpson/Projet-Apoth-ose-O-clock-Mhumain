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
      text: `INSERT INTO password_token(account_id, token)
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
  async get(account_id) {
    const query = {
        text: `SELECT token FROM password_token WHERE account_id = $1`,
        values: [account_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  async delete(account_id) {
    const query = {
        text: `DELETE FROM password_token WHERE account_id = $1`,
        values: [account_id]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = tokenDattaMapper;