const Model = require("../models/general.model");

const checkPwd = async (pwd, OPTIONS) => {
  try {
    const model = await Model.findOne({}, { pwd: 1 });
    if (!model) modelpwd = false;
    else modelpwd = model.pwd;
    const hashToCheck = OPTIONS.checkUserHash || modelpwd;
    return pwd === hashToCheck;
  } catch (error) {
    console.error(error);

    return false;
  }
};

module.exports = checkPwd;
