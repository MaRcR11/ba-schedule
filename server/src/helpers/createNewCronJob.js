const cron = require("node-cron");
const crawlScheduleData = require("./crawlScheduleData.helpers");
const updateLatestData = require("./updateUserLatestData");
const createNewCronJob = async (userID, data) => {
  console.log("new job for", userID);

  data[userID] = await crawlScheduleData();
  await updateLatestData(userID, data[userID]);

  cron.schedule("*/5 * * * *", async () => {
    console.log(`crawling data (${userID})...`);
    data[userID] = await crawlScheduleData();
    await updateLatestData(userID, data[userID]);
  });

  console.log(Object.keys(data));
};

module.exports = createNewCronJob;
