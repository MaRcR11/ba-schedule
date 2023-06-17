const cron = require("node-cron");
const { connectDB } = require("./db.service");
const bcrypt = require("bcryptjs");
const {
  createNewCronJob,
  updateUserLastLogin,
  createNewUser,
  checkUserRegistered,
  checkUserExistence,
  checkPwd,
  getEndTime,
  crawlScheduleData,
} = require("../helpers");

let data = {};
const isJobRunning = {};

(async () => {
  await connectDB();
  data = { general: await crawlScheduleData(null) };
})();

async function getData(req) {
  if (!data) return { status: 502, json: "no data" };
  const { pwd, userID } = req.query;
  const isUserRegistered = await checkUserRegistered(userID);
  if (!userID) {
    const isPwdValid = await checkPwd(pwd, { checkUserHash: false });
    return { status: isPwdValid ? 200 : 401, json: isPwdValid ? data.general : "not authorized" };
  } else if (isUserRegistered) {
    const isPwdValid = await checkPwd(pwd, {
      checkUserHash: isUserRegistered.get("hash").trim(),
    });
    return { status: isPwdValid ? 200 : 401, json: isPwdValid ? data[userID] : "not authorized" };
  } else {
    return { status: 401, json: "not authorized" };
  }
}

async function login(req) {
  const pwd = req.body.pwd;
  const isPwdValid = await checkPwd(pwd, { checkUserHash: false });
  return { status: isPwdValid ? 200 : 401, json: isPwdValid ? "login success" : "login failed" };
}

async function userLogin(req) {
  const { userID, hash: userHash } = req.body;
  const isUserExisting = await checkUserExistence(userID, userHash);

  if (!isUserExisting) return { status: 401, json: "login failed, user does not exist" };

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
async function getEndTimeOfCurrentDay() {
  if (!data) return { status: 502, json: "no data" };
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
