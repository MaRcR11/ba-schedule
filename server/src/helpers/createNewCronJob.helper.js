const cron = require("node-cron");
const getScheduleData = require("./getScheduleData.helper");

const createNewCronJobHelper = async (userID, userHash, data) => {
  data[userID] = await getScheduleData(userID, userHash);
  cron.schedule("*/5 * * * *", async () => {
    data[userID] = await getScheduleData(userID, userHash);
  });
};

module.exports = createNewCronJobHelper;
