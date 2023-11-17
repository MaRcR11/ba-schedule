const createNewUser = async (userID, userHash, token) => {
  const userModel = require("../models/user.model");
  const newUser = new userModel({
    userID: userID,
    hash: userHash,
    lastLogin: Date.now(),
    token: token,
  });
  await newUser.save();
};

module.exports = createNewUser;
