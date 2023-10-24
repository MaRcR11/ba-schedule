const userModel = require("../models/user.model");

const updateUserLastLoginHelper = async (userID = null) => {
  await userModel.findOneAndUpdate(
    { userID: userID },
    { $set: { lastLogin: Date.now() } }
  );
};

module.exports = updateUserLastLoginHelper;
