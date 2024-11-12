const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const app = express();
const db = require("./database/setup.js");
const postsModel = require("./models/posts.js");
const productsModel = require("./models/products.js");

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./productImages/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

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
app.post("/product", upload.single("img"), async (req, res) => {
  let { name, price, supplier } = req.body;

  let imgPath = null;
  if (req.file) {
    imgPath = `/productImages/${req.file.filename}`;
  }

  console.log(req.file);

  productsModel.addProduct(name, price, supplier, imgPath);
  res.sendStatus(201);
});

app.get("/posts", async (req, res) => {
  let posts = await postsModel.getAllPosts();
  res.status(200).json(posts);
});
app.get("/post/:id", async (req, res) => {
  let id = req.params["id"];
  let posts = await postsModel.getPostByID(id);
  res.status(200).json(posts);
});
app.post("/post", async (req, res) => {
  let { id, title, author, date, time, content } = req.body;

  await postsModel.addPost(id, title, author, date, time, content);
  res.sendStatus(201);
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Open on port: ", PORT);
  } else {
    console.error("Error occurred on: ", error);
  }
});
