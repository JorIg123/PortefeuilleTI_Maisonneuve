const knex = require('knex');


const config = {
  client: 'sqlite3',
  connection: {
    filename: 'dbCoiffeur.sqlite3'
  },
  useNullAsDefault: true
};


const db = knex(config);
module.exports = db;
