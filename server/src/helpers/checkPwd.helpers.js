const Model = require("../models/model");
const bcrypt = require("bcryptjs");
const checkPwd = async (pwd, OPTIONS) => {
  if (OPTIONS.checkUserHash) {
    if (!OPTIONS.checkUserHash) return false;
    try {
      const isValid = await bcrypt.compare(pwd, OPTIONS.checkUserHash);

      return isValid;
    } catch (error) {
      console.error(error);
    }
  } else {
    if (!pwd) return false;
    try {
      const pwdHashed = (await Model.find())[0].pwd;
      const isValid = await bcrypt.compare(pwd, pwdHashed);

      return isValid;
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = checkPwd;
