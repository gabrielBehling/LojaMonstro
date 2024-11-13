const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("./database/setup.js");
const postsModel = require("./models/posts.js");
const productsModel = require("./models/products.js");
const usersModel = require("./models/users.js");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true,
}))

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./postImages/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const uploadPostImages = multer({ storage: postStorage });

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./productImages/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const uploadProductImages = multer({ storage: productStorage });

const userIconStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./productImages/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const uploadUserIcons = multer({ storage: userIconStorage });

db.createDatabase();

function authenticateToken(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, username) => {
    if (err) return res.sendStatus(403);
    req.username = username;
    next();
  });
}

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
app.post("/product", uploadProductImages.single("img"), async (req, res) => {
  let { name, price, supplier } = req.body;
  
  let imgPath = null;
  if (req.file) {
    imgPath = `/productImages/${req.file.filename}`;
  }
  
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
app.post("/post", uploadPostImages.fields([{ name: "img" }, { name: "footerImg" }]), authenticateToken ,async (req, res) => {
  let { title, subtitle, content, author } = req.body;
  
  let id = title.toLowerCase().replace(/\s+/g, "-");
  
  let imgPath;
  if (req.files.img) {
    imgPath = `/postImages/${req.files.img[0].filename}`;
  }
  
  let footerImgPath;
  if (req.files.footerImg) {
    footerImgPath = `/postImages/${req.files.footerImg[0].filename}`;
  }
  
  await postsModel.addPost(id, title, subtitle, imgPath, content, footerImgPath, author);
  res.sendStatus(201);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  
  let userExists = await usersModel.userExists(username);
  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" });
  }
  
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("authToken", token, { httpOnly: true, secure: true, maxAge: 24*60*60*1000 });
  
  uploadUserIcons.single("userIcon")
  
  let imgPath = null;
  if (req.file) {
    imgPath = `/userIcons/${req.file.filename}`;
  }
  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  
  await usersModel.addUser(username, passwordHash, imgPath);
  res.status(201).json({ message: "Usuário registrado com sucesso!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  if(!usersModel.userExists(username)){
    res.status(404).json({ message: "Nenhum usuário com esse nome encontrado" });
  }
  
  let userHash = await usersModel.getUserHash(username)
  const isValidUser = bcrypt.compare(password, userHash)
  if (isValidUser) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("authToken", token, { httpOnly: true, secure: true, maxAge: 24*60*60*1000 });
    
    res.status(200).json({ message: "Usuário autenticado com sucesso." });
  } else {
    res.status(401).json({ message: "Nome de usuário ou senha incorretos." });
  }
  
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Open on port: ", PORT);
  } else {
    console.error("Error occurred on: ", error);
  }
});
