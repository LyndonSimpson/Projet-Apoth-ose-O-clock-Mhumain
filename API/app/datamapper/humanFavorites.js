const database = require('../../data/database');

const humanFavoritesDattaMapper = {
  /**
   * 
   * @param {*} human_id 
   * @param {*} cat_id 
   * @returns 
   */
  async createFavorite(human_id, cat_id) {
    const query = {
      text: `INSERT INTO human_has_favorites(human_id, cat_id) 
            VALUES($1,$2)`,
      values: [human_id, cat_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  async getFavorites(id) {
    const query = {
      text: `SELECT *
               FROM cat ca
               WHERE ca.id IN (
                    SELECT cat_id FROM human_has_favorites WHERE human_id = $1
               )`,
      values: [id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  async deleteFavorite(id) {
    const query = {
      text: `DELETE FROM human_has_favorites WHERE id = $1`,
      values: [id]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = humanFavoritesDattaMapper;