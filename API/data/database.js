const { Client } = require('pg');
const dotenv = require('dotenv');
const client = new Client("postgresql://mhumain:mhumain@localhost/mhumain"); 

client.connect();

module.exports = client;