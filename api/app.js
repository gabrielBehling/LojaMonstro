const express = require("express");
const app = express();
const db = require("./database/setup.js");
const postsModel = require("./models/posts.js");

require("dotenv").config();

db.createDatabase();

const PORT = process.env.PORT || 3000;

app.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/products", (req, res) => {});
app.get("/product/:id", (req, res) => {});
app.post("/product", (req, res) => {});

app.get("/posts", async (req, res) => {
  let posts = await postsModel.getAllPosts();
  res.status(200).json(posts);
});
app.get("/post/:id", async (req, res) => {
  let id = req.params["id"];
  let posts = await postsModel.getPostByID(id);
  res.status(200).json(posts);
});
app.post("/post", (req, res) => {
  let { id, title, author, date, time, content } = req.body;
  postsModel.addPost(id, title, author, date, time, content);
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Open on port: ", PORT);
  } else {
    console.error("Error occurred on: ", error);
  }
});
