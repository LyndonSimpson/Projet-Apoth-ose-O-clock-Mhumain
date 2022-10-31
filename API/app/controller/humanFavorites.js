const dataMapper = require("../datamapper/humanFavorites");


const humanFavoritesController = {
  newFavorite: async (req, res) => {
    try {
      const result = await dataMapper.createFavorite(req.body.profile_id, req.body.liked_profile_id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  allFavorites: async (req, res) => {
    try {
      const result = await dataMapper.getFavorites(req.body.human_id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
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