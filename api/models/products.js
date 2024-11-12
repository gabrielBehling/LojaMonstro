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

async function addProduct(name, price, supplier, imgPath) {
  let db = await conn.getDatabase();
  await db.query`
    INSERT INTO Product (name, price, supplier, img)
    VALUES (${name}, ${price}, ${supplier}, ${img})
    `;
}

module.exports = { getAllProducts, getProductByID, addProduct };
