const conn = require("../database/database");

async function getAllProducts() {
  let db = await conn.getDatabase();
  let res = await db.query`select * from Product`;

  return res.recordset;
}

async function getProductByID(id) {
  let db = await conn.getDatabase();
  let res = await db.query`select * from Product where id=${id}`;

  return res.recordset[0];
}

module.exports = { getAllProducts, getProductByID };
