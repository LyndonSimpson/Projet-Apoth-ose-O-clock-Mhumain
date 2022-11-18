const dataMapper = require("../datamapper/catSearch");

const catSearchController = {
  /**
   * searches for cats by sexe and age
   * 
   * @param {*} req body: cat search filters
   * @param {*} res all cat profiles within filters
   * @returns {JSON} array of cats that fit the search requirements
   */
  search: async (req, res) => {
    try {
      const result = await dataMapper.find(req.body.sexe, req.body.needs_garden); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = catSearchController;