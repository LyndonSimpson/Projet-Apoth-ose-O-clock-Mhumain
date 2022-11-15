const database = require('../../data/database');

const userDattaMapper = {
  /**
   * creates a new user in DB -no password hash here - only for dev tests
   * 
   * @param {*} email email of new user from body
   * @param {*} password password of new user from body
   * @returns empty
   */
  async createUser(email, password) {
    const query = {
      text: `INSERT INTO account(email, password) 
            VALUES($1,$2)`,
      values: [email, password]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * query to retrieve a user by its id in the DB
   * 
   * @param {*} id id of the searched user in DB
   * @returns the searched user profile info 
   */
  async getUserById(id) {
    const query = {
      text: `SELECT email FROM account WHERE id = $1`,
      values: [id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * query to retrieve one user by email in DB
   * 
   * @param {*} email email of the searched user
   * @returns the searched user
   */
  async getOneUserByEmail(email) {
    const query = {
      text: `SELECT * FROM account WHERE email = $1`,
      values: [email]
    };
    const result = await database.query(query);
    //console.log(result);
    return result.rows;
  },

  /**
   * query to get all users from DB !
   * 
   * @returns all users from DB
   */
  async getUsers() {
    const query = `SELECT * FROM account;`;
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * patches the user in user token in DB
   * 
   * @param {*} id user id in user token
   * @param {*} email patched email or same
   * @param {*} password patched password or same
   * @returns empty
   */
  async updateUser(id, email, password) {
    const query = {
      text: `UPDATE account
            SET email = $1, password = $2
            WHERE id = $3`,
      values: [email, password, id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * returns the email of the account linked to cat in token
   * 
   * @param {*} cat_id cat id in cat token
   * @returns email of account
   */
  async catMail(cat_id) {
    const query = {
      text: `SELECT email 
             FROM account u 
             WHERE u.id IN (
              SELECT account_id FROM cat WHERE id = $1
             )`,
      values: [cat_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  async humanMail(human_id) {
    const query = {
      text: `SELECT email 
             FROM account u 
             WHERE u.id IN (
              SELECT account_id FROM human WHERE id = $1
             )`,
      values: [human_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * deletes the user with user token
   * 
   * @param {*} id user id in user token
   * @returns empty
   */
  async deleteUser(id) {
    const query = {
      text: `DELETE FROM account WHERE id = $1`,
      values: [id]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = userDattaMapper;