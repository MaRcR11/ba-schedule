const cron = require("node-cron");
const crawlScheduleData = require("../helpers/crawlScheduleData.helpers");
const checkPwd = require("../helpers/checkPwd.helpers");
const getEndTime = require("../helpers/endTime.helpers");
const { connectDB } = require("./db.service");
const bcrypt = require("bcryptjs");
const checkUserExistence = require("../helpers/checkUserExistence.helpers");
const createNewUser = require("../helpers/createNewUser.helpers");
const updateUserLastLogin = require("../helpers/updateUserLastLogin");
const checkUserRegistered = require("../helpers/checkUserRegistered.helpers");
const createNewCronJob = require("../helpers/createNewCronJob");

let data = {};

(async () => {
  await connectDB();
  data = { general: await crawlScheduleData() };
})();

async function getData(req) {
  if (!data)
    return {
      status: 502,
      json: "no data",
    };
  const userID = req.query.userID;
  const pwd = req.query.pwd;

  const isUserRegistered = await checkUserRegistered(userID);
  if (!userID) {
    const isPwdValid = await checkPwd(pwd, { checkUserHash: false });
    if (!isPwdValid) return { status: 401, json: "not authorized" };
    return { status: 200, json: data.general };
  } else {
    const isPwdValid = await checkPwd(pwd, {
      checkUserHash: isUserRegistered.get("hash").trim(),
    });
    if (!isPwdValid) return { status: 401, json: "not authorized" };
    console.log(Object.keys(data));
    const userLatestData = isUserRegistered.get("latestData").trim();
    console.log(
      Boolean(userLatestData),
      "userLatestData",
      data[userID],
      "data[userID]"
    );
    if (!userLatestData)
      return {
        status: 502,
        json: "no data",
      };

    return { status: 200, json: data[userID] ? data[userID] : userLatestData };
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
  console.log(isUserExisting);
  if (!isUserExisting)
    return { status: 401, json: "login failed, user does not exist" };

  const isUserRegistered = await checkUserRegistered(userID);

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
      await createNewCronJob(userID, data);
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
  data.general = await crawlScheduleData();
});

module.exports = {
  getData,
  login,
  getEndTimeOfCurrentDay,
  userLogin,
};
