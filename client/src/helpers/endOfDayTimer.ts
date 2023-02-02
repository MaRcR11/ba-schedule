function getTodaysAppointments(data: any) {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  let d = new Date(),
    e: any = new Date(d);
  const timeAtStartOfDay =
    currentTime - Math.floor((e - d.setHours(0, 0, 0, 0)) / 1000);
  const filteredData = data.filter(
    (appointment: any) =>
      appointment.start >= timeAtStartOfDay &&
      appointment.end <= timeAtStartOfDay + 86400
  );
  return filteredData;
}

function createTimer(endTime: number) {
  let countDownDate = endTime * 1000;

  var x = setInterval(function () {
    let now = new Date().getTime();

    let distance = countDownDate - now;

    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    console.log(hours + "h " + minutes + "m " + seconds + "s ");

    if (distance < 0) {
      clearInterval(x);
      console.log(0 + "h " + 0 + "m " + 0 + "s ");
    }
  }, 1000);
}

function getEndTimeOfCurrentDayAndCreateTimer(data: any) {
  let filteredData = getTodaysAppointments(data);
  filteredData = filteredData.sort(
    (firstItem: any, secondItem: any) => secondItem.end - firstItem.end
  );
  if (filteredData[0]) createTimer(filteredData[0].end);
  return filteredData[0].end;
}

export { getEndTimeOfCurrentDayAndCreateTimer };
