const campusDualFetcher = require("../campusDualFetcher/campusDualFetcher");

let crawlTriedCounter = 0;
let data;
const getScheduleData = async (userID, userHash = null) => {
  try {
    console.log(`getting data (${userID ? userID : "general"})...`);
    data = await campusDualFetcher(userID, userHash);
    crawlTriedCounter = 0;
    return data;
  } catch (error) {
    console.log(error);
    if (crawlTriedCounter < 3) {
      getScheduleData(userID);
      crawlTriedCounter++;
    } else {
      crawlTriedCounter = 0;
    }
  }
};

module.exports = getScheduleData;
