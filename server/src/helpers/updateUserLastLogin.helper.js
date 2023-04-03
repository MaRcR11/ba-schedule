const userModel = require("../models/user.model");

const updateUserLastLoginHelper = async (userID, latestData) => {
  await userModel.findOneAndUpdate({
    userID: userID,
    ts: Date.now(),
  });
};

module.exports = updateUserLastLoginHelper;
