const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  userID: {
    required: true,
    type: String,
  },
  hash: {
    required: true,
    type: String,
  },
  lastLogin: {
    required: true,
    type: Number,
  },
  token: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("user", userModel, "users");
