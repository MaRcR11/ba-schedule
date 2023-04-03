const cron = require("node-cron");
const crawlScheduleData = require("../helpers/crawlScheduleData.helper");
const checkPwd = require("../helpers/checkPwd.helper");
const getEndTime = require("../helpers/endTime.helper");
const { connectDB } = require("./db.service");
const bcrypt = require("bcryptjs");
const checkUserExistence = require("../helpers/checkUserExistence.helper");
const createNewUser = require("../helpers/createNewUser.helper");
const updateUserLastLogin = require("../helpers/updateUserLastLogin.helper");
const checkUserRegistered = require("../helpers/checkUserRegistered.helper");
const createNewCronJob = require("../helpers/createNewCronJob.helper");

let data = {};
const isJobRunning = {};

(async () => {
  await connectDB();
  data = { general: await crawlScheduleData(null) };
})();

async function getData(req) {
  if (!data) return { status: 502, json: "no data" };
  const pwd = req.query.pwd;
  const userID = req.query.userID;
  const isUserRegistered = await checkUserRegistered(userID);
  if (!userID) {
    const isPwdValid = await checkPwd(pwd, { checkUserHash: false });
    if (!isPwdValid) return { status: 401, json: "not authorized" };
    return { status: 200, json: data.general };
  } else if (isUserRegistered) {
    const isPwdValid = await checkPwd(pwd, {
      checkUserHash: isUserRegistered.get("hash").trim(),
    });
    if (!isPwdValid) return { status: 401, json: "not authorized" };
    return { status: 200, json: data[userID] };
  } else {
    return { status: 401, json: "not authorized" };
  }
}

async function login(req) {
  const pwd = req.body.pwd;
  const isPwdValid = await checkPwd(pwd, { checkUserHash: false });
  if (!isPwdValid) return { status: 401, json: "login failed" };
  return { status: 200, json: "login success" };
}

async function userLogin(req) {
  const userID = req.body.userID;
  const userHash = req.body.hash;
  const isUserExisting = await checkUserExistence(userID, userHash);

  if (!isUserExisting)
    return { status: 401, json: "login failed, user does not exist" };

  const isUserRegistered = await checkUserRegistered(userID);

  if (!isJobRunning[userID]) {
    await createNewCronJob(userID, userHash, data);
    isJobRunning[userID] = true;
  }

  if (isUserRegistered) {
    const isHashValid = await checkPwd(userHash, {
      checkUserHash: isUserRegistered.get("hash").trim(),
    });

    if (!isHashValid) return { status: 401, json: "login failed" };

    try {
      await updateUserLastLogin(userID);
      return { status: 200, json: "login success" };
    } catch (error) {
      console.error(error);
      return { status: 500, json: "login failed" };
    }
  } else {
    const hash = await bcrypt.hashSync(userHash);

    try {
      await createNewUser(userID, hash);
      return { status: 200, json: "registration success" };
    } catch (error) {
      console.error(error);
      return { status: 500, json: "registration failed" };
    }
  }
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
  data.general = await crawlScheduleData(null);
});

module.exports = {
  getData,
  login,
  getEndTimeOfCurrentDay,
  userLogin,
};
