const database = require('../../data/database');

const humanFavoritesDattaMapper = {
  /**
   * adds the cat in body to the connected human in human token
   * 
   * @param {*} human_id human id in human token
   * @param {*} cat_id cat id in body
   * @returns the new relationship - liked cat
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
  /**
   * checks if the cat in body is a favorite of the human in human token
   * 
   * @param {*} human_id human id in token -'did this human like this cat ?'
   * @param {*} cat_id cat id in body -'is the cat in the human favorites ?'
   * @returns {boolean} true or false
   */
  async checkIfFavorite(human_id, cat_id) {
    const query = {
      text: `SELECT *
             FROM human_has_favorites
             WHERE human_id = $1
             AND cat_id = $2`,
      values: [human_id, cat_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * gets all the liked cat profiles for the connected human in human token
   * @param {*} human_id human id in human token
   * @returns {JSON} array of liked cat profiles
   */
  async getFavorites(human_id) {
    const query = {
      text: `SELECT *
               FROM cat ca
               WHERE ca.id IN (
                    SELECT cat_id FROM human_has_favorites WHERE human_id = $1
               )`,
      values: [human_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * deletes the fav relashionship with human id in human token and liked cat in body
   * 
   * @param {*} human_id human id in human token
   * @param {*} cat_id cat id in cat body
   * @returns empty
   */
  async deleteFavorite(human_id, cat_id) {
    const query = {
      text: `DELETE 
             FROM human_has_favorites
             WHERE human_id = $1
             AND cat_id = $2`,
      values: [human_id, cat_id]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = humanFavoritesDattaMapper;