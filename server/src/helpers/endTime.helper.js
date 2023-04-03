function getTodaysAppointments(data) {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  let d = new Date(),
    e = new Date(d);

  const timeAtStartOfDay =
    currentTime - Math.floor((e - d.setHours(0, 0, 0, 0)) / 1000);
  const filteredData = data.filter(
    (appointment) =>
      appointment.start >= timeAtStartOfDay &&
      appointment.end <= timeAtStartOfDay + 86400
  );
  return filteredData;
}

const getEndTime = (data) => {
  let filteredData = getTodaysAppointments(JSON.parse(data));
  filteredData = filteredData.sort(
    (firstItem, secondItem) => secondItem.end - firstItem.end
  );
  if (filteredData[0]) return filteredData[0].end;
};

module.exports = getEndTime;
