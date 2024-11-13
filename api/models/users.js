const conn = require("../database/database");

async function userExists(username) {
  let db = await conn.getDatabase();
  let res = await db.query`select * from User where username=${username}`;

  return res.recordset > 0;
}

async function addUser(username, passwordHash, imgPath) {
  let db = await conn.getDatabase();
  await db.query`
    INSERT INTO User (username, passwordHash, img)
    VALUES(${username}, ${passwordHash}, ${imgPath})
    `;
}

async function verifyUser(username, passwordHash) {
  let db = await conn.getDatabase();
  let res = await db.query`
    SELECT * FROM Users WHERE username = ${username} AND passwordHash = ${passwordHash}
    `;
  return res.recordset > 0
}

module.exports = { userExists, addUser, verifyUser };
