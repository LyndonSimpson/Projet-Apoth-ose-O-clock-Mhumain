const database = require('../../data/database');

const catSearchDattaMapper = {
  
  async find(sexe, needs_garden) {       
    const filter1 = sexe || "femelle";
    const filter2 = needs_garden || new Boolean(true);
    const query = {
      text: `SELECT *
    FROM cat
    WHERE sexe = $1
    AND needs_garden = $2`,
      values: [filter1, filter2]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = catSearchDattaMapper;