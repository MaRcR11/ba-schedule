import { FormattedScheduleData, ScheduleData } from "../global/types";

const scheduleDataFormat = (scheduleData: ScheduleData[]): FormattedScheduleData[] =>
  scheduleData.map((e) => ({
    EndTime: new Date(e.end * 1000),
    StartTime: new Date(e.start * 1000),
    Subject: `${e.description.replace("VS", "")} (${e.title})`,
    Location:
      e.remarks && !e.remarks.includes("Gruppe") && !e.remarks.includes("Prüfung")
        ? `${e.remarks} (${e.instructor})`
        : `BA Leipzig ${e.remarks ? `(${e.remarks})` : ""} (${e.sroom ? e.sroom : "Raum unbekannt"}) (${e.instructor})`,
  }));

export default scheduleDataFormat;
