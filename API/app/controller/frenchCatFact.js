const axios = require('axios');
const translate = require('google-translate-free');

const frenchCatFact = {
    frenchFact: async (req, res) => {
        try {
          const result = await axios.get('https://catfact.ninja/fact'); 
          const fact = result.data.fact; 
          console.log(`fact here : ${fact}`);
          const translatedText = await translate('hello', {from: 'en', to: 'fr'}); 
          console.log(translatedText);
          res.json(translatedText);
        } catch (error) {
          console.error(error);
          res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
      }
}

module.exports = frenchCatFact;