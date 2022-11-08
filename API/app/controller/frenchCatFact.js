const axios = require('axios');
const fetch = require('node-fetch');
const frenchCatFact = { // tout est payant...
    frenchFact: async (req, res) => {
        try {
          const result = await axios.get('https://catfact.ninja/fact'); 
          const fact = result.data.fact; 
          console.log(`fact here : ${fact}`);
          const options = {
            method: 'GET',
            url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
            params: {text: 'Hello, world!!', to: 'fr', from: 'en'},
            headers: {
              'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
              'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });} catch (error) { 
          console.error(error);
          res.status(500).send(`An error occured with the database :\n${error.message}`);
        }
      }
}

module.exports = frenchCatFact;


