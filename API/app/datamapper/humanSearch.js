const database = require('../../data/database');

const catSearchDattaMapper = {

  async find(has_pets, has_kids, has_garden) {
    const filter1 = has_pets;
    const filter2 = has_kids;
    const filter3 = has_garden;
    const query = {
      text: `SELECT *
    FROM human
    WHERE has_pets = $1
    AND has_kids = $2
    AND has_garden = $3`,
      values: [filter1, filter2, filter3]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = catSearchDattaMapper;