const fs = require("fs");
const https = require("https");
const path = require("path");

// cause campus dual is slow af, the idea here is to checkUserExistence as fast as possible on a random api cause there is only single value to load

const checkUserExistence = (userID, userHash) => {
  const OPTIONS = {
    host: "selfservice.campus-dual.de",
    path: `/dash/getcp?user=${userID}&hash=${userHash}`,
    ca: fs.readFileSync(path.join(__dirname, "..", "crawler", "campusdual-cert-chain.pem")),
    json: true,
  };

  try {
    return new Promise((resolve) => {
      https.get(OPTIONS, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(!isNaN(data));
        });
      });
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = checkUserExistence;
