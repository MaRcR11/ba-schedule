const userModel = require("../models/userModel");

const checkUserRegistered = async (userID) => {
  const userModel = require("../models/userModel");
  const isUserRegistered = await userModel
    .findOne({
      userID: userID,
    })
    .exec();

  return isUserRegistered;
};

module.exports = checkUserRegistered;
