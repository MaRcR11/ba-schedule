const Model = require("../models/general.model");

const checkPwd = async (pwd, OPTIONS) => {
  try {
    const hashToCheck = OPTIONS.checkUserHash || (await Model.findOne({}, { pwd: 1 })).pwd;
    return pwd === hashToCheck;
  } catch (error) {
    console.error(error);

    return false;
  }
};

module.exports = checkPwd;
