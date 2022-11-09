const dataMapper = require("../datamapper/humanSearch");

const humanSearchController = {
  /**
   * searches for humans by 'has pets', 'has kids' and 'has garden'
   * 
   * @param {*} req body: human search filters
   * @param {*} res all human profiles within filters
   * @returns {JSON} array of humans that fit the search requirements
   */
  search: async (req, res) => {
    try {                                       
      const result = await dataMapper.find(req.body.has_pets, req.body.has_kids, req.body.has_garden); //todo  const { firstName, lastName, email, password } = req.body; this his how you do it
      res.json(result);                                                         
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  }
}

module.exports = humanSearchController;