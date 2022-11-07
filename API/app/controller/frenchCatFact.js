const axios = require('axios');
const { translate } = require('free-translate');

const frenchCatFact = {
    frenchFact: async (req, res) => {
        try {
          const result = await axios.get('https://catfact.ninja/fact'); 
          console.log(result.data.fact) 
          const translatedText = await translate(result, { from: 'en', to: 'fr' }); 
          //console.log(translatedText);
          res.json(translatedText);
        } catch (error) {
          console.error(error);
          res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
      }
}

module.exports = frenchCatFact;