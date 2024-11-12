const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database/setup.js");
const postsModel = require("./models/posts.js");
const productsModel = require("./models/products.js");

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.createDatabase();

const PORT = process.env.PORT || 3000;

app.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/products", async (req, res) => {
  let product = await productsModel.getAllProducts();
  res.status(200).json(product);
});
app.get("/product/:id", async (req, res) => {
  let id = req.params["id"];
  let product = await productsModel.getProductByID(id);
  res.status(200).json(product);
});
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
  res.sendStatus(201);
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Open on port: ", PORT);
  } else {
    console.error("Error occurred on: ", error);
  }
});
