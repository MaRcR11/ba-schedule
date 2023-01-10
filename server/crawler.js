const puppeteer = require("puppeteer");

const crawler = async () => {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();
    await page.goto(
      "https://selfservice.campus-dual.de/room/json?userid=5002080&hash=a0f51c26573dbf74502666d418252988&start=1648418400&end=1649023200&_=1648473223770",
      { waitUntil: "networkidle0", timeout: 60000 }
    );
    const data = await page.evaluate(
      () => document.querySelector("pre").innerText
    );
    await browser.close();
    return data;
  } catch (err) {
    throw new Error();
  }
};

module.exports = crawler;
