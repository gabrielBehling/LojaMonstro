const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/status", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.get("/products", (req, res) => {});
app.get("/product/:id", (req, res) => {});
app.post("/product", (req, res) => {});

app.get("/posts", (req, res) => {});
app.get("/post/:id", (req, res) => {});
app.post("/post", (req, res) => {});

app.listen(PORT, (error) => {
	if (!error) {
		console.log("Open on port: ", PORT);
	} else {
		console.error("Error occurred on: ", error);
	}
});
