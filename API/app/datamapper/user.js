const database = require('../../data/database');

const userDattaMapper = {
  
  async createUser(email, password) {

    const query = {
      text: `INSERT INTO account(email, password) 
            VALUES($1,$2)`,
      values: [email, password]
    };
    const result = await database.query(query);
    return result.rows;
  },
  async getUserById(id) {

    const query = {
      text: `SELECT * FROM account WHERE id = $1`,
      values: [id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  async getUsers() {

    const query = `SELECT * FROM account;`;

    const result = await database.query(query);
    return result.rows;
  },
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