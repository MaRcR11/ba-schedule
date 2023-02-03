const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = 4959 || process.env.PORT;
const dotenv = require("dotenv");
const scheduleRouter = require("./src/routes/schedule.route");
const rateLimiter = require("./src/middlewares/rateLimit.middleware");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());
app.use("/", scheduleRouter);
app.use(rateLimiter);

dotenv.config();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
});

app.get("/timer", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/timer.html"));
});

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
