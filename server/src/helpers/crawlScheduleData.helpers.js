const crawler = require("../crawler/crawler");

let crawlTriedCounter = 0;
let data;
const crawlScheduleData = async (userID) => {
  try {
    console.log(`crawling data (${userID ? userID : "general"})...`);
    data = await crawler();
    crawlTriedCounter = 0;
    return data;
  } catch (error) {
    console.log(error);
    if (crawlTriedCounter < 3) {
      crawlScheduleData();
      crawlTriedCounter++;
    } else {
      crawlTriedCounter = 0;

    }
  }
};


module.exports = crawlScheduleData;
