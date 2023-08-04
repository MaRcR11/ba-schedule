const createNewUser = async (userID, userHash, token) => {
  console.log("token", token, "userID", userID)
  const userModel = require("../models/user.model");
  const newUser = new userModel({
    userID: userID,
    hash: userHash,
    ts: Date.now(),
    token: token
  });
  await newUser.save();
};

module.exports = createNewUser;
