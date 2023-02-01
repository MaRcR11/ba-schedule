const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const crawler = require("./crawler");
const app = express();
const PORT = 4959 || process.env.PORT;
const cron = require("node-cron");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Model = require("./models/model");
const db = mongoose.connection;

let data;
let crawlTriedCounter = 0;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());
dotenv.config();

//db
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL);
db.on("error", (error) => {
  console.log(error);
});
db.on("connected", () => {
  console.log("db connected");
});

//server

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
  crawlScheduleData();
});
app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/api/getData", async (req, res) => {
  if (!data) res.status(502);
  const pwd = req.query.pwd;
  const result = await checkPwd(pwd);
  result ? res.json(data) : res.status(401).json("not authorized");
});

app.post("/login", async (req, res) => {
  const pwd = req.body.pwd;
  const result = await checkPwd(pwd);
  result ? res.status(200).json("success") : res.status(401).json("failed");
});

const checkPwd = async (pwd) => {
  if (!pwd) return false;
  try {
    const pwdHashed = (await Model.find())[0].pwd;
    const isValid = await bcrypt.compare(pwd, pwdHashed);

    return isValid;
  } catch (error) {
    return false;
  }
};

const crawlScheduleData = async () => {
  try {
    console.log("crawling data...");
    data = await crawler();
    crawlTriedCounter = 0;
  } catch (error) {
    console.log(error);
    if (crawlTriedCounter < 3) {
      crawlScheduleData();
      crawlTriedCounter++;
    } else {
      crawlTriedCounter = 0;
    }
  }
};

cron.schedule("*/5 * * * *", crawlScheduleData);
