const { Client } = require('pg');
const dotenv = require('dotenv');
const client = new Client(process.env.PG_URL); 

client.connect();

module.exports = client;