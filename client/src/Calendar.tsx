import React from "react";
import {
  Agenda,
  Day,
  Inject,
  Month,
  ScheduleComponent,
  Week,
  WorkWeek,
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";
import scheduleDataFormat from "./scheduleDataFormat";
interface Props {
  scheduleData: { start: number; end: number; title: string }[];
}
function Calendar(props: Props) {
  const formattedScheduleData = scheduleDataFormat(props.scheduleData);
  const localData: EventSettingsModel = { dataSource: formattedScheduleData };

  console.log(scheduleDataFormat(props.scheduleData));

  return (
    <ScheduleComponent eventSettings={localData} currentView="WorkWeek">
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default Calendar;
