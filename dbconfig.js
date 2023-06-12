const pg = require("pg");

const connectionString = process.env.CONNECTION_STRING;
const pool = new pg.Pool(
  {
    connectionString,
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
