const userModel = require("../models/userModel");

const updateUserLastLogin = async (userID) => {
  await userModel.findOneAndUpdate({
    userID: userID,
    ts: Date.now(),
  });
};

module.exports = updateUserLastLogin;
