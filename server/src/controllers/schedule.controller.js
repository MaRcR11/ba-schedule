const scheduleService = require("../services/schedule.service");

async function handleRequest(handler, req, res, next) {
  try {
    const result = await handler(req);
    const { status, json } = result;
    if (json?.token) {
      res.cookie("token", json.token, { httpOnly: true });
    }
    res.status(status).json(json);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    next(err);
  }
}

module.exports = {
  getData: async (req, res, next) => await handleRequest(scheduleService.getData, req, res, next),
  login: async (req, res, next) => await handleRequest(scheduleService.login, req, res, next),
  getEndTimeOfCurrentDay: async (req, res) => await handleRequest(scheduleService.getEndTimeOfCurrentDay, req, res),
  userLogin: async (req, res, next) => await handleRequest(scheduleService.userLogin, req, res, next),
};
