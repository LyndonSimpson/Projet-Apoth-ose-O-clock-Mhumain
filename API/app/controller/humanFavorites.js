const dataMapper = require("../datamapper/humanFavorites");


const humanFavoritesController = {
  newFavorite: async (req, res) => {
    try {
      const result = await dataMapper.createFavorite(req.session.user.id, req.body.liked_profile_id); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      res.json(result);                                                   //TODO req.session.user.id ici ! --- le human connecté like depuis son id!
                                                                          //reste plus qu'à voir comment récupérer le liked_profile_id
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
  allFavorites: async (req, res) => {
    const id = req.params.id; //TODO il va falloir mettre ici qqchose comme id = req.session.profile.id; - en créant session.profile
    try {
      const result = await dataMapper.getFavorites(id);
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