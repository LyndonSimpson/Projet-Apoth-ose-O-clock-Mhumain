const database = require('../../data/database');

const catFavoritesDattaMapper = {
  /**
   * creates a new favorite relashionship between profile that likes and liked_profile
   * 
   * @param {*} cat_id profiles that adds a favorite : from cat id in cat token
   * @param {*} human_id liked human id : id retrieved in body.liked_profile_id
   * @returns empty
   */
  async createFavorite(cat_id, human_id) {
    const query = {
      text: `INSERT INTO cat_has_favorites(cat_id, human_id) 
            VALUES($1,$2)`,
      values: [cat_id, human_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * checks in the DB if favorite relationship exists between cat in cat token and human id passed in body
   * 
   * @param {*} cat_id retrieved in cat token
   * @param {*} human_id retrieved in body
   * @returns the relationship (its id and both profiles ids)
   */
  async checkIfFavorite(cat_id, human_id) {
    const query = {
      text: `SELECT *
             FROM cat_has_favorites
             WHERE cat_id = $1
             AND human_id = $2`,
      values: [cat_id, human_id]
    };
    const result = await database.query(query);
    return result.rows;
  },
  /**
   * gets all the favorite human profiles of the cat profile with cat id passed in params
   * 
   * @param {*} id cat id retrieved in cat token
   * @returns all the humans that this cat liked 
   */
  async getFavorites(id) {
    const query = {
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
  /**
   * deletes the fav relashionship with cat id in cat token and liked human in body
   * 
   * @param {*} cat_id cat id in cat token
   * @param {*} human_id human id in body 
   * @returns empty
   */
  async deleteFavorite(cat_id, human_id) {
    const query = {
      text: `DELETE 
             FROM cat_has_favorites 
             WHERE cat_id = $1
             AND human_id = $2`,
      values: [cat_id, human_id]
    };
    const result = await database.query(query);
    return result.rows;
  }
}

module.exports = catFavoritesDattaMapper;