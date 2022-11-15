const dataMapper = require("../datamapper/human");
const multer = require('multer');

const humanController = {
  /**
   * creates a new human in DB, requires a user token
   * 
   * @param {*} req  multipartForm - profile pic and human info
   * @param {*} res created human || errors
   * @returns {JSON} if checks work and client has user token, new cat
   */
  newHuman: async (req, res) => {
    const id = req.auth.userId;
    const fakeObject = {};
    try {
      const AlreadyExists = await dataMapper.getMyhumans(id);
      const check = AlreadyExists[0];
      const isEmpty = Object.keys(check || fakeObject).length === 0;
      if (!isEmpty) {
        res.status(500).send('You already have a human profile on this account')
      } else {
        //console.log(`nouvel humain créé : ${req.body.pseudo}`); - for testing
        //console.log(`nom de sa photo : ${req.file.filename}`); - for testing
        const image_name = req.file.filename; 
        const result = await dataMapper.createHuman(req.body.pseudo, image_name, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
          req.body.description, req.body.age,
          req.body.has_pets, req.body.has_kids, req.body.has_garden,
          id);
        const searchedUser = await dataMapper.getOneHumanByPseudo(req.body.pseudo);
        res.json(searchedUser);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets one human by id
   * 
   * @param {*} req human token
   * @param {*} res searched human || errors
   * @returns {JSON} the searched human 
   */
  oneHuman: async (req, res) => {
    const id = req.auth.humanId;
    try {
      const result = await dataMapper.getHumanById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets all the humans from DB
   * 
   * @param {*} req 
   * @param {*} res all the humans || errors
   * @returns {JSON} all the humans in DB
   */
  allHumans: async (req, res) => {
    try {
      const result = await dataMapper.getHumans();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets randomly 5 human 
   * 
   * @param {*} req 
   * @param {*} res 5 random human profiles || errors
   * @returns {JSON} array of 5 random human profiles
   */
  Humans5: async (req, res) => {
    try {
      const result = await dataMapper.get5RandomHumans();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * updates the info of the human in human token
   * 
   * @param {*} req human token / multipartForm - profile pic and cat info
   * @param {*} res the updates human || errors
   * @returns {JSON} the updated human info
   */
  update: async (req, res) => {
    const id = req.auth.humanId;
    try {
      //console.log(`nouveau pseudo human modifié : ${req.body.pseudo}`); - for testing
      //console.log(`nom de sa nouvelle photo : ${req.file.filename}`); - for testing
      const image_name = req.file.filename;
      const result = await dataMapper.updateHuman(req.body.pseudo, image_name, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
        req.body.description, req.body.age,
        req.body.has_pets, req.body.has_kids, req.body.has_garden,
        id); 
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * deletes the human in human token
   * 
   * @param {*} req human token
   * @param {*} res result || errors
   * @returns {JSON} empty array if human deleted
   */
  delete: async (req, res) => {
    const id = req.auth.humanId;
    try {
      const result = await dataMapper.deleteHuman(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = humanController;