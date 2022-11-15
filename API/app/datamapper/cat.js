const database = require('../../data/database');

const catDataMapper = {
    /**
     * creates a new cat instance with received params, sends it to the DB, returns created cat
     * 
     * @param {*} pseudo 
     * @param {*} image 
     * @param {*} name 
     * @param {*} description 
     * @param {*} race 
     * @param {*} age 
     * @param {*} sexe 
     * @param {*} color 
     * @param {*} likes_pets 
     * @param {*} likes_kids 
     * @param {*} needs_garden 
     * @param {*} siblings_id 
     * @param {*} account_id 
     * @returns new created cat
     */
    async createCat(pseudo, image, name, description, race, age, sexe, color, likes_pets, likes_kids,
        needs_garden, siblings_id, account_id) {
        const query = {
            text: `INSERT INTO cat(pseudo, image, name, description, race, age, sexe, color, likes_pets, likes_kids,
                needs_garden, siblings_id, account_id) 
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
            values: [pseudo, image, name, description, race, age, sexe, color, likes_pets, likes_kids,
                needs_garden, siblings_id, account_id
            ]
        }; // no "is_adopted" and no "owner_id" because the cat cannot be adopted already when just created.
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * selects all cats in the DB !
     * 
     * @returns all cats
     */
    async getCats() {
        const query = `SELECT * FROM cat;`;
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * selects 5 random cat profiles in the DB for human profile homePage
     * 
     * @returns 5 random cats from the DB 
     */
    async get5RandomCats() {
        const query = `SELECT * FROM cat
        ORDER BY RANDOM()
        LIMIT 5;`;
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * selects all the cats that are adopted from the DB
     * 
     * @returns all cats where is_adopted is true
     */
    async adoptedCats() {
        const query = `SELECT * FROM cat WHERE is_adopted = true;`; // or "1" for true bolean - must do some tests here!
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * retrieves a cat in DB that has the id passed as param
     * 
     * @param {*} id id of the searched cat
     * @returns the searched cat
     */
    async getCatById(id) {
        const query = {
            text: `SELECT * FROM cat WHERE id = $1`,
            values: [id]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * retrieves a cat in DB that has the pseudo passed as param
     * 
     * @param {*} pseudo pseudo of the searched cat
     * @returns the searched cat
     */
    async getOneCatByPseudo(pseudo) {
        const query = {
            text: `SELECT * FROM cat WHERE pseudo = $1`,
            values: [pseudo]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * retrieves all the cats owned by user with user token
     * 
     * @param {*} id id retrieved from the user token
     * @returns array of cats owned by user
     */
    async getMyCats(id) {
        const query = {
            text: `SELECT * FROM cat WHERE account_id = $1`,
            values: [id]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * patches the cat profile from the cat token
     * 
     * @param {*} pseudo 
     * @param {*} image 
     * @param {*} name 
     * @param {*} description 
     * @param {*} race 
     * @param {*} age 
     * @param {*} sexe 
     * @param {*} color 
     * @param {*} likes_pets 
     * @param {*} likes_kids 
     * @param {*} needs_garden 
     * @param {*} siblings_id 
     * @param {*} id retrieved from cat token
     * @returns the updated cat info
     */
    async updateCat(pseudo, name, description, race, age, sexe, color, likes_pets, likes_kids,
        needs_garden, siblings_id, id) {
        const query = {
            text: `UPDATE cat
            SET pseudo = $1, name = $2, description = $3, race = $4, age = $5, sexe = $9, color = $10, likes_pets = $11, likes_kids = $12, needs_garden = $13, siblings_id = $14
            WHERE id = $15`,
            values: [pseudo, name, description, race, age, sexe, color, likes_pets, likes_kids,
                needs_garden, siblings_id, id
            ]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * updates the image of the cat
     * 
     * @param {*} image new image
     * @param {*} id id of cat ot update
     * @returns 
     */
    async updateCatimage(image, id) {
        const query = {
            text: `UPDATE cat
            SET image = $1
            WHERE id = $2`,
            values: [image, id]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * changes the cat info to is_adopted = true and gives the cat an owner id : this is the PK of the human that adopted the cat
     * 
     * @param {*} owner_id human id retrieved in human token
     * @param {*} id human id in human token
     * @returns adopted cat
     */
    async adopt(owner_id, id) {
        const is_adopted = true;
        const query = {
            text: `UPDATE cat
            SET is_adopted = $1, owner_id = $2
            WHERE id = $3`,
            values: [is_adopted, owner_id, id]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * deletes the cat with the id passed in params
     * 
     * @param {*} id cat id from cat token
     * @returns empty
     */
    async deleteCat(id) {
        const query = {
            text: `DELETE FROM cat WHERE id = $1`,
            values: [id]
        };
        const result = await database.query(query);
        return result.rows;
    }
}

module.exports = catDataMapper;