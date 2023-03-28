const cron = require("node-cron");
const crawlScheduleData = require("./crawlScheduleData.helpers");

const createNewCronJob = async (userID, data) => {
  console.log("new job for", userID);

  data[userID] = await crawlScheduleData();

  cron.schedule("*/5 * * * *", async () => {
    data[userID] = await crawlScheduleData();
  });

  console.log(Object.keys(data));
};

module.exports = createNewCronJob;
