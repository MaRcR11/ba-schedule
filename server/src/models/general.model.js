const mongoose = require("mongoose");

const GeneralModel = new mongoose.Schema({
  pwd: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("pwd", GeneralModel, "password");
