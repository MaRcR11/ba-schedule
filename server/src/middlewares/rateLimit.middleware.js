const rateLimit = require("express-rate-limit");

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 600000, // 10 min in milliseconds
  max: 20,
  message: "You have exceeded the 20 requests in 10 min limit!",
  standardHeaders: true,
  legacyHeaders: false,
  skip: function (req, res) {
    if (
      (req.path === "/userLogin/" && req.method === "POST") ||
      (req.path === "/login/" && req.method === "POST")
    ) {
      return false;
    }
    return true;
  },
});

module.exports = rateLimiterUsingThirdParty;
