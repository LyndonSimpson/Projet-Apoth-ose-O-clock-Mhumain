const dataMapper = require("../datamapper/user");
const humanDataMapper = require("../datamapper/human");
const catDataMapper = require("../datamapper/cat");

const userController = {
  
  oneUser: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.getUserById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  getMyHumanProfiles: async (req, res) => {
    const id = req.session.user.id;
    try {
      const result = await humanDataMapper.getMyhumans(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  getMyCatProfiles: async (req, res) => {
    const id = req.session.user.id;
    try {
      const result = await catDataMapper.getMyCats(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  allUsers: async (req, res) => {
    try {
      const result = await dataMapper.getUsers();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await dataMapper.updateUser(id, req.body.email, req.body.password); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
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