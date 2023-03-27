const cron = require("node-cron");
const crawlScheduleData = require("../helpers/crawlScheduleData.helpers");
const checkPwd = require("../helpers/checkPwd.helpers");
const getEndTime = require("../helpers/endTime.helpers");
const { connectDB } = require("./db.service");

let data;

(async () => {
  await connectDB();
  data = await crawlScheduleData();
})();

async function getData(req) {
  if (!data)
    return {
      status: 502,

      json: "no data",
    };
  const pwd = req.query.pwd;

  const isPwdValid = await checkPwd(pwd);
  if (!isPwdValid) return { status: 401, json: "not authorized" };
  return { status: 200, json: data };
}

async function login(req) {
  const pwd = req.body.pwd;
  const isPwdValid = await checkPwd(pwd);
  if (!isPwdValid) return { status: 401, json: "login failed" };
  return { status: 200, json: "login success" };
}

async function userLogin(req) {
  const pwd = req.body.pwd;
  const isPwdValid = await checkPwd(pwd);
  if (!isPwdValid) return { status: 401, json: "login failed" };
  return { status: 200, json: "login success" };
}

async function getEndTimeOfCurrentDay(req) {
  if (!data)
    return {
      status: 502,

      json: "no data",
    };
  let endtime = getEndTime(data);
  return { status: 200, json: endtime };
}

cron.schedule("*/5 * * * *", async () => {
  data = await crawlScheduleData();
});

module.exports = {
  getData,
  login,
  getEndTimeOfCurrentDay,
  userLogin,
};
