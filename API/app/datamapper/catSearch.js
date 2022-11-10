const database = require('../../data/database');

const catSearchDattaMapper = {
  /**
   * selects all cats that fit the filter options selected by the human
   * 
   * @param {*} sexe 'mâle' or 'femelle'
   * @param {*} needs_garden true or false
   * @returns array of cats that fit the search
   */
  async find(sexe, needs_garden) {
    const filter1 = sexe || "femelle";
    const filter2 = needs_garden;
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