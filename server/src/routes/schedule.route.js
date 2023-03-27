const express = require("express");
const router = express.Router();

const scheduleController = require("../controllers/schedule.controller");

router.get("/api/getData", scheduleController.getData);
router.post("/login", scheduleController.login);
router.get(
  "/api/getEndTimeOfCurrentDay",
  scheduleController.getEndTimeOfCurrentDay
);
router.get("/userLogin", scheduleController.login);

module.exports = router;
