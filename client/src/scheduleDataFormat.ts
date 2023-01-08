function scheduleDataFormat(
  scheduleData: { start: number; end: number; title: string; remarks: string }[]
): any {
  const formattedScheduleData: any = [];

  scheduleData.map((e, i) => {
    formattedScheduleData.push({
      EndTime: new Date(e.end * 1000),
      StartTime: new Date(e.start * 1000),
      Subject: e.title,
      Location: e.remarks ? e.remarks : "BA Leipzig",
      Owner: "Pter",
    });
  });
  return formattedScheduleData;
}

export default scheduleDataFormat;
