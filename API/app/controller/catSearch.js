const dataMapper = require("../datamapper/catSearch");


const catSearchController = {
  search: async (req, res) => {
    try {                                       
      const result = await dataMapper.find( req.body.sexe, req.body.needs_garden); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      res.json(result);                                                         
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }

}

module.exports = catSearchController;