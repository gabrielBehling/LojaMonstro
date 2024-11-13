const conn = require("../database/database");

async function getAllPosts() {
  let db = await conn.getDatabase();
  let res = await db.query`SELECT * FROM dbo.Post ORDER BY date DESC, time DESC`;

  return res.recordset;
}

async function getPostByID(id) {
  let db = await conn.getDatabase();
  let res = await db.query`select * from Post where id=${id}`;

  return res.recordset[0];
}

async function addPost(id, title, subtitle, imgPath, content, footerImgPath, author) {
  let db = await conn.getDatabase();
  await db.query`
    INSERT INTO Post (id, title, subtitle, img, content, footerImg, author)
    VALUES(${id}, ${title}, ${subtitle}, ${imgPath}, ${content}, ${footerImgPath}, ${author})
    `;
}

module.exports = { getAllPosts, getPostByID, addPost };
