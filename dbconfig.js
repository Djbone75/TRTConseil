const pg = require("pg");

const connectionString = process.env.CONNECTION_STRING;
const pool = new pg.Pool(
  {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
  (err, result) => {
    if (("probleme : ", err)) {
      console.log(err);
    } else {
      console.log(result);
    }
  }
);

module.exports = { pool };
