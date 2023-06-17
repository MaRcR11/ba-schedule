const userModel = require("../models/user.model");

const updateUserLastLoginHelper = async (userID = null) => {
  await userModel.findOneAndUpdate({
    userID: userID,
    ts: Date.now(),
  });
};

module.exports = updateUserLastLoginHelper;
