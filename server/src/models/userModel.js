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
  ts: {
    required: true,
    type: Number,
  },
  latestData: {
    type: String,
  },
});

module.exports = mongoose.model("user", userModel, "users");
