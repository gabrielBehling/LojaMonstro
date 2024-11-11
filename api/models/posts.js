const conn = require("../database/database");

async function getAllPosts() {
  let db = await conn.getDatabase();
  let res = await db.query`select * from Post`;

  return res.recordset;
}

async function getPostByID(id) {
  let db = await conn.getDatabase();
  let res = await db.query`select * from Post where id=${id}`;

  return res.recordset[0];
}

async function addPost(id, title, author, date, time, content) {
  let db = await conn.getDatabase();
  await db.query`
    INSERT INTO Post (id, title, author, date, time, content)
    VALUES (${id}, ${title}, ${author}, ${date}, ${time}, ${content})
    `;
}

module.exports = { getAllPosts, getPostByID, addPost };
