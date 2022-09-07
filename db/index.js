const { Client } = require("pg");

let client = new Client({
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
});

client.connect();

module.exports = client;
