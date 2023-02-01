const mongoose = require("mongoose");

const Model = new mongoose.Schema({
  pwd: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("pwd", Model, "password");
