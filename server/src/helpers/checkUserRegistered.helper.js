const userModel = require("../models/user.model");

const checkUserRegistered = async (userID) => {
  const isUserRegistered = await userModel
    .findOne({
      userID: userID,
    })
    .exec();

  return isUserRegistered;
};

module.exports = checkUserRegistered;
