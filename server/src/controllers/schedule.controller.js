const scheduleService = require("../services/schedule.service");
const path = require("path");

async function getData(req, res, next) {
  try {
    res.json(await scheduleService.getData(req));
  } catch (err) {
    console.error(`Error while getting index page`, err.message);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    res.json(await scheduleService.login(req));
  } catch (err) {
    console.error(`Error while login`, err.message);
    next(err);
  }
}

module.exports = {
  getData,
  login,
};
