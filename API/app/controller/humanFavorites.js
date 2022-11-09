const dataMapper = require("../datamapper/humanFavorites");

const humanFavoritesController = {
  /**
   * adds a new cat favorite to the client with the human token
   * 
   * @param {*} req human token / body: the liked cat profile id
   * @param {*} res the liked profile || errors 
   * @returns {JSON} the liked profile info
   */
  newFavorite: async (req, res) => {
    try {
      const result = await dataMapper.createFavorite(req.auth.humanId, req.body.liked_profile_id); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * gets the favorite cat profiles of human in client human token
   * 
   * @param {*} req human token
   * @param {*} res cat profiles likes by human || errors
   * @returns {JSON} array of cat profiles liked by human
   */
  allFavorites: async (req, res) => {
    const id = req.auth.humanId;
    try {
      const result = await dataMapper.getFavorites(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  /**
   * deletes the cat profile from favorites of human in client human token
   * 
   * @param {*} req human token
   * @param {*} res result || errors
   * @returns {JSON} returns new list of cat favorites
   */
  delete: async (req, res) => {
    const id = req.auth.humanId;
    try {
      const result = await dataMapper.deleteFavorite(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = humanFavoritesController;