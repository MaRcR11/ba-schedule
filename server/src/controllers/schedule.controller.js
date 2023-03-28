const scheduleService = require("../services/schedule.service");
const path = require("path");

async function getData(req, res, next) {
  try {
    const scheduleServiceGetData = await scheduleService.getData(req);
    res.status(scheduleServiceGetData.status).json(scheduleServiceGetData.json);
  } catch (err) {
    console.error(`Error while getting index page`, err.message);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const scheduleServiceLogin = await scheduleService.login(req);
    res.status(scheduleServiceLogin.status).json(scheduleServiceLogin.json);
  } catch (err) {
    console.error(`Error while login`, err.message);
    next(err);
  }
}

async function getEndTimeOfCurrentDay(req, res) {
  try {
    const scheduleServiceEndTime = await scheduleService.getEndTimeOfCurrentDay(
      req
    );
    res.status(scheduleServiceEndTime.status).json(scheduleServiceEndTime.json);
  } catch (err) {
    console.error(`Error while getting end-time`, err.message);
  }
}

async function userLogin(req, res, next) {
  try {
    const scheduleServiceLogin = await scheduleService.userLogin(req);
    res.status(scheduleServiceLogin.status).json(scheduleServiceLogin.json);
  } catch (err) {
    console.error(`Error while login`, err.message);
    next(err);
  }
}

module.exports = {
  getData,
  login,
  getEndTimeOfCurrentDay,
  userLogin,
};
