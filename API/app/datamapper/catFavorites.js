const database = require('../../data/database');

const catFavoritesDattaMapper = {
  
  async createFavorite(cat_id, human_id) {
    const query = {
      text: `INSERT INTO cat_has_favorites(cat_id, human_id) 
            VALUES($1,$2)`,
      values: [cat_id, human_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  async getFavorites(id) {

    const query ={
        text: `SELECT *
               FROM human hu
               WHERE hu.id IN (
                    SELECT human_id FROM cat_has_favorites WHERE cat_id = $1
               )`,
                values: [id]
                };

    const result = await database.query(query);
    return result.rows;
  },
  async deleteFavorite(id) {

    const query = {
      text: `DELETE FROM cat_has_favorites WHERE id = $1`,
      values: [id]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = catFavoritesDattaMapper;