const rateLimit = require("express-rate-limit");

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 600000, // 10 min in milliseconds
  max: 50,
  message: "You have exceeded the 100 requests in 10 min limit!",
  standardHeaders: true,
  legacyHeaders: false,
  skip: function (req, res) {
    // Only apply rate limiting to the "/" and "/timer" endpoints
    if (
      req.path === "/" ||
      (req.path === "/userLogin/" && req.method === "POST") ||
      (req.path === "/login/" && req.method === "POST")
    ) {
      return false;
    }

    // Skip rate limiting for all other requests
    return true;
  },
});

module.exports = rateLimiterUsingThirdParty;
