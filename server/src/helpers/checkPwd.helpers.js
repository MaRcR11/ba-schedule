const Model = require("../models/model");
const bcrypt = require("bcryptjs");
const checkPwd = async (pwd) => {
  if (!pwd) return false;
  try {
    const pwdHashed = (await Model.find())[0].pwd;
    const isValid = await bcrypt.compare(pwd, pwdHashed);

    return isValid;
  } catch (error) {
    return false;
  }
};

module.exports = checkPwd;
