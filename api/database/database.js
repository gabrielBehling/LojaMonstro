var sql = require("mssql");

require("dotenv").config();

sql.on("error", (err) => {
  console.log(err);
});

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port:parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function getDatabase() {
  if (pool) {
    return await pool.connect();
  }
  var pool = new sql.ConnectionPool(config);
  return await pool.connect();
}

module.exports = { getDatabase };
