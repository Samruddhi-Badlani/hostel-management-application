const { Pool } = require("pg");
const constring = "postgres://postgres:root@localhost:5432/hostels";
const pool = new Pool({
  connectionString: constring,
});
pool.connect();

module.exports = pool;
