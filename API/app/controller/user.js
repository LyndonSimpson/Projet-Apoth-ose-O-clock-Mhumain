const dataMapper = require("../datamapper/user");
const humanDataMapper = require("../datamapper/human");
const catDataMapper = require("../datamapper/cat");
const bcrypt = require('bcrypt');

const userController = {
  /**
   * gets one user with user token
   * 
   * @param {*} req user token
   * @param {*} res user profile info
   * @returns {JSON} user profile info
   */
  oneUser: async (req, res) => {
    const id = req.auth.userId;
    try {
      const result = await dataMapper.getUserById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets the human profile of the user in user token (only 1 is possible)
   * 
   * @param {*} req user token
   * @param {*} res human profile -only 1 possible by account
   * @returns {JSON} the human profile
   */
  getMyHumanProfiles: async (req, res) => {
    const id = req.auth.userId;
    try {
      const result = await humanDataMapper.getMyhumans(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets the cat profiles of the user in user token
   * 
   * @param {*} req user token
   * @param {*} res cat profiles of the account
   * @returns {JSON} array of owned cat profiles
   */
  getMyCatProfiles: async (req, res) => {
    const id = req.auth.userId;
    try {
      const result = await catDataMapper.getMyCats(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets all the user in DB !
   * 
   * @param {*} req -
   * @param {*} res all users
   * @returns {JSON} array of all users in DB ! 
   */
  allUsers: async (req, res) => {
    try {
      const result = await dataMapper.getUsers();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * updates the user in user token
   * 
   * @param {*} req user token / body: email, password
   * @param {*} res the updated profile info
   * @returns {JSON} the updated profile info
   */
  update: async (req, res) => {
    const id = req.auth.userId;
    try {
      const encryptedMsg = bcrypt.hashSync(req.body.password, 10);
      const result = await dataMapper.updateUser(id, req.body.email, encryptedMsg); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * deletes the user in user token
   * 
   * @param {*} req user token
   * @param {*} res empty
   * @returns {JSON} empty
   */
  delete: async (req, res) => {
    const id = req.auth.userId;
    try {
      const result = await dataMapper.deleteUser(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = userController;