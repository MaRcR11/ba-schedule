const rateLimit = require("express-rate-limit");

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 600000, // 10 min in milliseconds
  max: 100,
  message: "You have exceeded the 100 requests in 10 min limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiterUsingThirdParty;
