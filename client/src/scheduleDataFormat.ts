function scheduleDataFormat(
  scheduleData: { start: number; end: number }[]
): any {
  const formattedScheduleData: any = [];

  scheduleData.map((e, i) => {
    formattedScheduleData.push({
      EndTime: new Date(e.end * 1000),
      StartTime: new Date(e.start * 1000),
    });
  });
  return formattedScheduleData;
}

export default scheduleDataFormat;
