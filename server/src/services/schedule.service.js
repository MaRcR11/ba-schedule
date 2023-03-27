const cron = require("node-cron");
const crawlScheduleData = require("../helpers/crawlScheduleData.helpers");
const checkPwd = require("../helpers/checkPwd.helpers");
const getEndTime = require("../helpers/endTime.helpers");
const { connectDB } = require("./db.service");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const https = require("https");
const fs = require("fs");
const path = require("path");
const checkUserExistence = require("../helpers/checkUserExistence.helpers");

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

  const isPwdValid = await checkPwd(pwd, { checkUserHash: false });
  if (!isPwdValid) return { status: 401, json: "not authorized" };
  return { status: 200, json: data };
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

  const isUserRegistered = await userModel
    .findOne({
      userID: userID,
    })
    .exec();

  if (isUserRegistered) {
    console.log("login");
    const isHashValid = await checkPwd(userHash, {
      checkUserHash: isUserRegistered.get("hash").trim(),
    });
    if (!isHashValid) return { status: 401, json: "login failed" };

    try {
      await userModel.findOneAndUpdate({
        userID: userID,
        ts: Date.now(),
      });
      return { status: 200, json: "login success" };
    } catch (error) {
      console.error(error);
      return { status: 500, json: "login failed" };
    }
  } else {
    console.log("register");

    const hash = await bcrypt.hashSync(userHash);

    try {
      const newUser = new userModel({
        userID: userID,
        hash: hash,
        ts: Date.now(),
      });
      await newUser.save();
      return { status: 200, json: "registration success" };
    } catch (error) {
      console.error(error);
      return { status: 500, json: "registration failed, " };
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
  data = await crawlScheduleData();
});

module.exports = {
  getData,
  login,
  getEndTimeOfCurrentDay,
  userLogin,
};
