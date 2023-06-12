const pg = require("pg");

const connectionString = process.env.CONNECTION_STRING;
const pool = new pg.Pool({}, (err, result) => {
  if (("probleme : ", err)) {
    console.log(err);
  } else {
    console.log(result);
  }
});

module.exports = { pool };
