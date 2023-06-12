const pg = require("pg");

const connectionString = process.env.CONNECTION_STRING;
const pool = new pg.Pool({}, (err, result) => {
  if (err) {
    console.log("probleme : ", err);
  } else {
    console.log(result);
  }
});

module.exports = { pool };
