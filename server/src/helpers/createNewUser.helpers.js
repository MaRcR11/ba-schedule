const createNewUser = async (userID, hash) => {
  const userModel = require("../models/userModel");
  const newUser = new userModel({
    userID: userID,
    hash: hash,
    ts: Date.now(),
  });
  await newUser.save();
};

module.exports = createNewUser;
