const cron = require("node-cron");
const crawlScheduleData = require("./crawlScheduleData.helpers");
const getAllUsers = require("./getAllUsers");

const initialCrawl = async (data) => {
  console.log("hiiii");
  const allUsers = getAllUsers();
  cron.schedule("*/1 * * * *", async () => {
    data.general = await crawlScheduleData(false, false);
    allUsers.map(
      async (userID) =>
        (data[userID] = await crawlScheduleData(userID, userHash))
    );
  });
};

module.exports = initialCrawl;
