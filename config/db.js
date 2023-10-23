const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db_final_project_1",
  password: "1",
  port: "5432",
});

module.exports = pool;
