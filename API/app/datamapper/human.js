const database = require('../../data/database');

const humanDataMapper = {
    async createHuman(pseudo, image, name, description, age, has_pets, has_kids,
        has_garden, account_id) { 

        const query = {
            text: `INSERT INTO human(pseudo, image, name, description, age, has_pets, has_kids,
                has_garden, account_id) 
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            values: [pseudo, image, name, description, age, has_pets, has_kids,
                has_garden, account_id]
          };
        const result = await database.query(query);
        console.log(result.rows);
        return result.rows;
    },
    async getHumans() { 

        const query =`SELECT * FROM human;`;
            
        const result = await database.query(query);
        return result.rows;
    },
    async getHumanById(id) { 

        const query = {
            text: `SELECT * FROM human WHERE id = $1`,
            values: [id]
          };
            
        const result = await database.query(query);
        return result.rows;
    },
    async getOneHumanByPseudo(pseudo) { 

        const query = {
            text: `SELECT * FROM human WHERE pseudo = $1`,
            values: [pseudo]
          };
            
        const result = await database.query(query);
        return result.rows;
    },
    async getMyhumans(id) { 

        const query = {
            text: `SELECT * FROM human WHERE account_id = $1`,
            values: [id]
          };
            
        const result = await database.query(query);
        return result.rows;
    },
    async updateHuman(pseudo, image, name, description, age, has_pets, has_kids,
                      has_garden, id) { 

        const query = {
            text: `UPDATE human
            SET pseudo = $1, image = $2, name = $3, description = $4, age = $5, has_pets = $6, has_kids = $7, has_garden = $8
            WHERE id = $9`,
            values: [pseudo, image, name, description, age, has_pets, has_kids,
                     has_garden, id]
          };
        const result = await database.query(query);
        return result.rows;
    },
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