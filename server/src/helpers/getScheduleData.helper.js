const campusDualFetcher = require("../campusDualFetcher/campusDualFetcher");

let retryCount = 0;
let data;
const getScheduleData = async (userID, userHash = null) => {
  try {
    console.log(`getting data (${userID ? userID : "general"})...`);
    data = await campusDualFetcher(userID, userHash);
    retryCount = 0;
    return data;
  } catch (error) {
    console.log(error);
    if (retryCount < 3) {
      getScheduleData(userID);
      retryCount++;
    } else {
      retryCount = 0;
    }
  }
};

module.exports = getScheduleData;
