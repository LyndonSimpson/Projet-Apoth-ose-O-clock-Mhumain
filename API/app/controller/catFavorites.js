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