const cron = require("node-cron");
const crawlScheduleData = require("./crawlScheduleData.helpers");

const createNewCronJob = async (userID, userHash, data) => {
  data[userID] = await crawlScheduleData(userID, userHash);

  cron.schedule("*/5 * * * *", async () => {
    data[userID] = await crawlScheduleData(userID, userHash);
  });


};

module.exports = createNewCronJob;
