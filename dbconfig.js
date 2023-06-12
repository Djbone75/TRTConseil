const pg = require("pg");

const connectionString = process.env.CONNECTION_STRING;
const pool = new pg.Pool({
  connectionString,
});

module.exports = { pool };
