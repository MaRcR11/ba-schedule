const userModel = require("../models/userModel");

const updateUserLatestData = async (userID, latestData) => {
  await userModel.findOneAndUpdate({
    userID: userID,
    ts: Date.now(),
    latestData: latestData,
  });
};

module.exports = updateUserLatestData;
