const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const scheduleRouter = require("./src/routes/schedule.route");
const rateLimiter = require("./src/middlewares/rateLimit.middleware");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 4000 || process.env.PORT;

app.use(rateLimiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());
app.use("/", scheduleRouter);
app.use(cookieParser());
app.set("trust proxy", 1);
dotenv.config();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
});

app.get("/timer", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/pages/timer.html"));
});

app.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/pages/info.html"));
});

app.listen(PORT, () => {
  console.log(`Server at ${PORT}`);
});
