const pg = require("pg");
var fs = require("fs");
const path = require("path");
const pool = new pg.Pool(
  {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  (err, result) => {
    if (err) {
      return console.log(
        "problème base de donnée, reverifiez vos identifiants "
      );
    }

    next();
  }
);

module.exports = { pool };
