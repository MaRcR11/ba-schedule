function scheduleDataFormat(
  scheduleData: {
    start: number;
    end: number;
    description: string;
    remarks: string;
    title: string;
    instructor: string;
    sroom: string;
  }[]
): any {
  const formattedScheduleData: any = [];
  const regexGroup = "Gruppe";
  const regexVSreplace = "VS";
  scheduleData.map((e, i) => {
    formattedScheduleData.push({
      EndTime: new Date(e.end * 1000),
      StartTime: new Date(e.start * 1000),
      Subject: `${
        e.description.replace(regexVSreplace, "") + ` ` + `(${e.title})`
      }`,
      Location:
        e.remarks && !e.remarks.match(regexGroup)
          ? e.remarks
          : `BA Leipzig ${e.remarks ? `(${e.remarks})` : ""} (${e.sroom}) (${
              e.instructor
            })`,
    });
  });
  return formattedScheduleData;
}

export default scheduleDataFormat;
