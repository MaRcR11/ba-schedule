const https = require('https');
const fs = require('fs');

var options = {
  host: "selfservice.campus-dual.de",
  path: "/room/json?userid=5002080&hash=a0f51c26573dbf74502666d418252988&start=1648418400&end=1649023200&_=1648473223770",
  ca: fs.readFileSync(__dirname + '/campusdual-cert-chain.pem'),
  json:true
};

const crawler = async () => {
  try {
    return new Promise((resolve) => {
      https.get(options, function(res) {
        res.setEncoding('utf8');
        res_str = "";

        res.on('data', (chunk) => {
          res_str += chunk;
        }).on('end', () => {
          resolve(res_str)
        });
      });
    });

  } catch (err) {
    throw new Error();
  }
}

module.exports = crawler;