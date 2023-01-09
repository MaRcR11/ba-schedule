const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const crawler = require("./crawler");
const app = express();
const PORT = 8001 || process.env.PORT;
const cron = require("node-cron");
let data;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
  crawlScheduleData();
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
});

app.get("/api/getData", async (req, res) => {
  if (!data || !data.crawledData) {
    res.status(500);
  } else if (data.failed) res.status(500).json({ message: data.error.message });
  else res.json(data.crawledData);
});

const crawlScheduleData = async () => {
  try {
    console.log("crawling data...");
    crawledData = await crawler();
    data = { crawledData: crawledData, failed: false };
  } catch (error) {
    data = { failed: true, error };
  }
};

cron.schedule("0 * * * *", crawlScheduleData);
