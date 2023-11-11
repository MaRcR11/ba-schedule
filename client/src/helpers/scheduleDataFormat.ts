import { FormattedScheduleData, ScheduleData } from "../global/types";

const scheduleDataFormat = (scheduleData: ScheduleData[]): FormattedScheduleData[] =>
  scheduleData.map(({ end, start, description, title, remarks, instructor, sroom }) => ({
    EndTime: new Date(end * 1000),
    StartTime: new Date(start * 1000),
    Subject: description === title ? description.replace("VS", "") : `${description.replace("VS", "")} (${title})`,
    Location: remarks && !remarks.includes("Gruppe") && !remarks.includes("Prüfung")
      ? `${remarks} (${instructor})`
      : `Berufsakademie ${remarks ? `(${remarks})` : ""} (${sroom ? sroom : "Raum unbekannt"}) (${instructor})`,
  }));

export default scheduleDataFormat;
