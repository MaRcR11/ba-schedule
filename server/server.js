const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const crawler = require("./crawler");
const app = express();
const PORT = 8001 || process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
});

app.get("/api/getData", async (req, res) => {
  try {
    const data = await crawler();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
