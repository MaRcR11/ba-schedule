const https = require("https");
const fs = require("fs");

// 5002080 a0f51c26573dbf74502666d418252988

const crawler = async (userID, userHash) => {
  const OPTIONS = {
    host: "selfservice.campus-dual.de",
    path: `/room/json?userid=${userID}&hash=${userHash}`,
    ca: fs.readFileSync(__dirname + "/campusdual-cert-chain.pem"),
    json: true,
  };

  let res_str;
  try {
    return new Promise((resolve) => {
      https.get(OPTIONS, function (res) {
        res.setEncoding("utf8");
        res_str = "";

        res
          .on("data", (chunk) => {
            res_str += chunk;
          })
          .on("end", () => {
            resolve(res_str);
          });
      });
    });
  } catch (err) {
    throw new Error();
  }
};

module.exports = crawler;
