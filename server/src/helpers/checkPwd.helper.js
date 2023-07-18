const Model = require("../models/general.model");
const bcrypt = require("bcryptjs");

const checkPwd = async (pwd, OPTIONS) => {
  try {
    const hashToCheck = OPTIONS.checkUserHash || (await Model.findOne({}, { pwd: 1 })).pwd;
    return hashToCheck ? await bcrypt.compare(pwd, hashToCheck) : false;
  } catch (error) {
    console.error(error);

    return false;
  }
};

module.exports = checkPwd;
