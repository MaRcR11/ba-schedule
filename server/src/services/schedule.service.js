const cron = require("node-cron");
const { connectDB } = require("./db.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  createNewCronJob,
  updateUserLastLogin,
  createNewUser,
  checkUserRegistered,
  checkUserExistence,
  checkPwd,
  getEndTime,
  crawlScheduleData,
  updateUserToken,
  verifyToken,
} = require("../helpers");
const Model = require("../models/general.model");
const userModel = require("../models/user.model");

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
  const isPwdValid = await checkPwd(pwd, {
    checkUserHash: isUserRegistered ? isUserRegistered.get("hash").trim() : false,
  });
  return {
    status: userID ? (isPwdValid ? 200 : 401) : isPwdValid ? 200 : 401,
    json: isPwdValid ? (userID ? data[userID] : data.general) : "not authorized",
  };
}

async function login(req) {
  const { pwd } = req.body;
  const token = req.body?.token;
  const isValid = verifyToken(token);

  if (token && !(await userModel.findOne({ token }))) {
    return { status: 200, json: { isValid: isValid, key: (await Model.findOne({}, { pwd: 1 })).pwd } };
  }
  const isPwdValid = await checkPwd(pwd ? pwd : "", { checkUserHash: false });

  if (pwd) {
    return {
      status: isPwdValid ? 200 : 401,
      json: isPwdValid
        ? { msg: "login success", token: jwt.sign({ pwd }, process.env.TOKEN_SECRET, { expiresIn: "6d" }) }
        : "login failed",
    };
  }
  return { status: 200, json: "login with token failed" };
}

async function userLogin(req) {
  const { userID, hash: userHash } = req.body;
  const token = req.body?.token;

  const isValid = verifyToken(token);
  
  const { hash, userID: id } = await userModel.findOne({ token }) || {};

  if (token) {
    return { status: 200, json: { isValid: isValid, key: hash, userID: id } };
  }

  if (!userHash && !token) {
    return { status: 200, json: "login with token failed" };
  }

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
    const token = jwt.sign({ userHash }, process.env.TOKEN_SECRET, { expiresIn: "6d" });

    try {
      await updateUserLastLogin(userID);
      await updateUserToken(userID, token);
      return {
        status: 200,
        json: { msg: "login success", token: token },
      };
    } catch (error) {
      console.error(error);
      return { status: 500, json: "login failed" };
    }
  } else {
    try {
      const token = jwt.sign({ userHash }, process.env.TOKEN_SECRET, { expiresIn: "6d" });
      await createNewUser(userID, userHash, token);
      return {
        status: 200,
        json: {
          msg: "registration success",
          token: token,
        },
      };
    } catch (error) {
      console.error(error);
      return { status: 500, json: "registration failed" };
    }
  }
}
async function getEndTimeOfCurrentDay() {
  if (!data) return { status: 502, json: "no data" };
  let endtime = getEndTime(data.general);
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
