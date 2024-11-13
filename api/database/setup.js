const sql = require("mssql");
const fs = require("fs").promises;

require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port:parseInt(process.env.DB_PORT),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function databaseExists(pool, dbName) {
  const result = await pool.request().query(`SELECT name FROM sys.databases WHERE name = N'${dbName}'`);
  return result.recordset.length > 0;
}

async function createDatabase() {
  const pool = await sql.connect(dbConfig);
  const dbName = process.env.DB_DATABASE;

  try {
    // Verifica se o banco já existe
    const exists = await databaseExists(pool, dbName);
    if (exists) {
      console.log("Banco de dados já existe.");
      return;
    }

    // Lê o conteúdo do arquivo SQL
    let query = await fs.readFile("./database/createDatabase.sql", "utf-8");
    await pool.request().query(query);

    query = await fs.readFile("./database/createTables.sql", "utf-8");
    await pool.request().query(query);

    console.log("Banco de dados criado com sucesso!");
  } catch (err) {
    console.error("Erro ao criar o banco de dados:", err);
  } finally {
    // Fecha a conexão
    await pool.close();
  }
}

module.exports = { createDatabase };
