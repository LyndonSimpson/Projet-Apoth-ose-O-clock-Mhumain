const dataMapper = require("../datamapper/cat");
const multer = require('multer');

const catController = {
  /**
   * creates a new cat in DB, requires a user token
   *
   * @param {*} req multipartForm - profile pic and cat info
   * @param {*} res created cat || errors
   * @return {JSON} if checks work and client has a cat token, returns the new cat in json
   */
  newCat: async (req, res) => {
    const id = req.auth.userId;
    try {
      //console.log(`nouveau chat créé : ${req.body.pseudo}`); - for testing
      //console.log(`nom de sa photo : ${req.file.filename}`); - for testing
      const image_name = req.file.filename;

      const result = await dataMapper.createCat(req.body.pseudo, image_name, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
        req.body.description, req.body.race, req.body.age, req.body.sexe,
        req.body.color,
        req.body.likes_pets, req.body.likes_kids, req.body.needs_garden,
        req.body.siblings_id,
        id);
      const searchedUser = await dataMapper.getOneCatByPseudo(req.body.pseudo);
      res.json(searchedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets one cat by id
   * 
   * @param {*} req cat token
   * @param {*} res searched cat || errors
   * @return {JSON} the searched cat 
   */
  oneCat: async (req, res) => {
    const id = req.auth.catId;
    try {
      const result = await dataMapper.getCatById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets all the adopted cats in DB
   * 
   * @param {*} req 
   * @param {*} res list of adopted cats || errors
   * @return {JSON} array of all the adopted cats 
   */
  getAdoptedCats: async (req, res) => {
    try {
      const result = await dataMapper.adoptedCats();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets all the cats from DB
   * 
   * @param {*} req 
   * @param {*} res all the cats || errors
   * @returns {JSON} all the cats in the DB
   */
  allCats: async (req, res) => {
    try {
      const result = await dataMapper.getCats();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets randomly 5 cats 
   * 
   * @param {*} req 
   * @param {*} res 5 random cat profiles || errors
   * @returns {JSON} array of 5 random cat profiles
   */
  cats5: async (req, res) => {
    try {
      const result = await dataMapper.get5RandomCats();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * updates the info of the cat in cat token
   * 
   * @param {*} req cat token / multipartForm - profile pic and cat info
   * @param {*} res  the updated cat || errors
   * @returns {JSON} the updated cat info
   */
  update: async (req, res) => {
    const id = req.auth.catId;
    try {
      const result = await dataMapper.updateCat(req.body.pseudo, req.body.name, //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
        req.body.description, req.body.race, req.body.age, req.body.sexe,
        req.body.color,
        req.body.likes_pets, req.body.likes_kids, req.body.needs_garden, req.body.siblings_id, // no "account_id" because the user that create the profil cannot change!
        id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * updates only the image of the cat in DB with id of cat in token
   * 
   * @param {*} req image in multipart form and id in token
   * @param {*} res empty - success 200
   */
  updateImage: async (req, res) => {
    const id = req.auth.catId;
    try {
      //console.log(`nom de sa nouvelle photo : ${req.file.filename}`); - for testing
      const image_name = req.file.filename;
      const result = await dataMapper.updateCatimage(image_name, id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * adopts the cat of id in params with human token
   * 
   * @param {*} req human token / body: adopted_cat_id
   * @param {*} res the adopted cat || errors
   * @returns {JSON} the adopted cat info
   */
  adoptCat: async (req, res) => {
    const id = req.body.adopted_cat_id;
    try {
      const result = await dataMapper.adopt(req.auth.humanId,
        id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * deletes the cat in cat token
   * 
   * @param {*} req cat token
   * @param {*} res result || errors
   * @returns {JSON} empty array if cat deleted
   */
  delete: async (req, res) => {
    const id = req.auth.catId;
    try {
      const result = await dataMapper.deleteCat(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = catController;