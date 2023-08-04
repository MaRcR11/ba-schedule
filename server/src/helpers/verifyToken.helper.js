const jwt = require("jsonwebtoken");

function verifyToken(token) {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET);

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = verifyToken;
