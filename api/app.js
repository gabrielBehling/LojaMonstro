const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const bcrypt = require("bcrypt");
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const db = require("./database/setup.js");
const postsModel = require("./models/posts.js");
const productsModel = require("./models/products.js");
const usersModel = require("./models/users.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function ensureDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

ensureDirectoryExists("./postImages");
ensureDirectoryExists("./productImages");
ensureDirectoryExists("./userIcons");

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

const userIconStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./userIcons/");
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

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
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

app.get("/posts", async (req, res) => {
  let posts = await postsModel.getAllPosts();
  res.status(200).json(posts);
});
app.get("/post/:id", async (req, res) => {
  let id = req.params["id"];
  let post = await postsModel.getPostByID(id);

  if (!post) res.sendStatus(404)

  res.status(200).json(post);
});
app.post(
  "/post",
  uploadPostImages.fields([
    { name: "img", maxCount: 1 },
    { name: "footerImg", maxCount: 1 },
  ]),
  authenticateToken,
  async (req, res) => {
    try {
      let { title, subtitle, content } = req.body;
      let author = req.user.username;
      let id = title.toLowerCase().replace(/\s+/g, "-");

      let imgPath = null;
      let footerImgPath = null;

      // Verifique se os arquivos foram carregados corretamente
      if (req.files) {
        if (req.files.img && req.files.img[0]) {
          imgPath = `/api/postImages/${req.files.img[0].filename}`;
        }

        if (req.files.footerImg && req.files.footerImg[0]) {
          footerImgPath = `/api/postImages/${req.files.footerImg[0].filename}`;
        }
      }

      // Adiciona o post ao banco de dados
      await postsModel.addPost(id, title, subtitle, imgPath, content, footerImgPath, author);
      res.sendStatus(201);
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      res.sendStatus(500);
    }
  }
);

app.post("/register", uploadUserIcons.single("userIcon"), async (req, res) => {
  const { username, password } = req.body;

  let userExists = await usersModel.userExists(username);
  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // Checar e salvar o caminho da imagem do usuário
  let imgPath = null;
  if (req.file) {
    imgPath = `/api/userIcons/${req.file.filename}`;
  }

  // Criptografar a senha do usuário
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Salvar os dados do usuário no banco de dados
  await usersModel.addUser(username, passwordHash, imgPath);
  res.status(201).json({ message: "Usuário registrado com sucesso." });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!usersModel.userExists(username)) {
    res.status(404).json({ message: "Nenhum usuário com esse nome encontrado" });
  }

  let userHash = await usersModel.getUserHash(username);
  const isValidUser = bcrypt.compare(password, userHash);
  if (isValidUser) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Usuário autenticado com sucesso." });
  } else {
    res.status(401).json({ message: "Nome de usuário ou senha incorretos." });
  }
});

app.get("/user/profile", authenticateToken, async (req, res) => {
  try {
    const username = req.user.username;
    const user = await usersModel.getUserByUsername(username);
    if (user) {
      res.status(200).json({ userIcon: user.img });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfil do usuário." });
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
