const database = require('../../data/database');

const humanDataMapper = {
    /**
     * creates a new human instance with received params, sends it to the DB, returns created human
     * 
     * @param {*} pseudo 
     * @param {*} image 
     * @param {*} name 
     * @param {*} description 
     * @param {*} age 
     * @param {*} has_pets 
     * @param {*} has_kids 
     * @param {*} has_garden 
     * @param {*} account_id 
     * @returns new created human
     */
    async createHuman(pseudo, image, name, description, age, has_pets, has_kids,
        has_garden, account_id) {
        const query = {
            text: `INSERT INTO human(pseudo, image, name, description, age, has_pets, has_kids,
                has_garden, account_id) 
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            values: [pseudo, image, name, description, age, has_pets, has_kids,
                has_garden, account_id
            ]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * selects all humans in DB !
     * 
     * @returns all humans
     */
    async getHumans() {
        const query = `SELECT * FROM human;`;
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * selects 5 random human profiles in the DB for cat profile homePage
     * 
     * @returns 5 random human profiles from DB
     */
    async get5RandomHumans() {
        const query = `SELECT * FROM human
        ORDER BY RANDOM()
        LIMIT 5;`;
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * retrieves a human in DB that has the id passed as param
     * 
     * @param {*} id id of the searched human
     * @returns the searched human
     */
    async getHumanById(id) {
        const query = {
            text: `SELECT * FROM human WHERE id = $1`,
            values: [id]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * retrieves a human in DB that has the pseudo passed as param
     * 
     * @param {*} pseudo pseudo of the searched human
     * @returns the searched human
     */
    async getOneHumanByPseudo(pseudo) {
        const query = {
            text: `SELECT * FROM human WHERE pseudo = $1`,
            values: [pseudo]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * retrieves the human owned by the user with user token
     * 
     * @param {*} id id retrieved from the user token
     * @returns human profile owned by user
     */
    async getMyhumans(id) {
        const query = {
            text: `SELECT * FROM human WHERE account_id = $1`,
            values: [id]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * patches the human profile from the human token
     * 
     * @param {*} pseudo 
     * @param {*} image 
     * @param {*} name 
     * @param {*} description 
     * @param {*} age 
     * @param {*} has_pets 
     * @param {*} has_kids 
     * @param {*} has_garden 
     * @param {*} id retrieved from human token
     * @returns 
     */
    async updateHuman(pseudo, name, description, age, has_pets, has_kids,
        has_garden, id) {
        const query = {
            text: `UPDATE human
            SET pseudo = $1, name = $2, description = $3, age = $4, has_pets = $5, has_kids = $6, has_garden = $7
            WHERE id = $8`,
            values: [pseudo, name, description, age, has_pets, has_kids,
                has_garden, id
            ]
        };
        const result = await database.query(query);
        return result.rows;
    },
    /**
     * updates only the image of the human in token
     * @param {*} image image name multipart form multer
     * @param {*} id human id in token
     * @returns empty -success 200
     */
    async updateHumanImage(image, id) {
        const query = {
            text: `UPDATE human
            SET image = $1
            WHERE id = $2`,
            values: [image, id]
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
    async deleteHuman(id) {
        const query = {
            text: `DELETE FROM human WHERE id = $1`,
            values: [id]
        };
        const result = await database.query(query);
        return result.rows;
    }
}

module.exports = humanDataMapper;