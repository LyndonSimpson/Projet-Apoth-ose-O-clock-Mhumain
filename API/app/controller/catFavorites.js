const dataMapper = require("../datamapper/catFavorites");


const catFavoritesController = {
  /**
   * adds a new human favorite to the client with the cat token
   * 
   * @param {*} req cat token / body: the liked profile id
   * @param {*} res the liked profile || errors
   * @returns {JSON} the liked profile info
   */
  newFavorite: async (req, res) => {
    try {
      const result = await dataMapper.createFavorite(req.auth.catId, req.body.liked_profile_id); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * takes the cat id in token and human id in body and checks if cat has added that human to its favorites
   * 
   * @param {*} req cat id in cat token / body: (possible) liked_profile_id of the human to check
   * @param {*} res boolean (is the human a favorite of this connected cat?)
   * @returns {boolean} true or false
   */
  isHumanInFavorites: async (req, res) => {
    const fakeObject = {};
    try {
      const result = await dataMapper.checkIfFavorite(req.auth.catId, req.body.liked_profile_id); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      const getHuman = result[0];
      const check = Object.keys(getHuman || fakeObject).length === 0;
      res.json(!check);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets the favorite human profiles of cat in client cat token
   * 
   * @param {*} req cat token
   * @param {*} res human profiles liked by cat || errors
   * @returns {JSON} array of human profiles liked by cat
   */
  allFavorites: async (req, res) => {
    const id = req.auth.catId;
    try {
      const result = await dataMapper.getFavorites(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * deletes the human profile from favorites of cat in client cat token
   * 
   * @param {*} req cat token
   * @param {*} res result || errors
   * @returns {JSON} returns new list of human favorites
   */
  delete: async (req, res) => {
    const id = req.auth.catId;
    try {
      const result = await dataMapper.deleteFavorite(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = catFavoritesController;