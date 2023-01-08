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
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import scheduleDataFormat from "../helper/scheduleDataFormat";
interface Props {
  scheduleData: {
    start: number;
    end: number;
    description: string;
    remarks: string;
    title: string;
    instructor: string;
    sroom: string;
  }[];
}
function Calendar(props: Props) {
  const formattedScheduleData = scheduleDataFormat(props.scheduleData);
  const localData: EventSettingsModel = {
    dataSource: formattedScheduleData,
    allowAdding: false,
    allowEditing: false,
    allowDeleting: false,
  };

  return (
    <ScheduleComponent eventSettings={localData} currentView="WorkWeek">
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default Calendar;
