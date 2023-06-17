const express = require("express");
const router = express.Router();
const { getData, login, getEndTimeOfCurrentDay, userLogin } = require("../controllers/schedule.controller");

router
  .get("/api/getData", getData)
  .post("/login", login)
  .get("/api/getEndTimeOfCurrentDay", getEndTimeOfCurrentDay)
  .post("/userLogin", userLogin);

module.exports = router;
