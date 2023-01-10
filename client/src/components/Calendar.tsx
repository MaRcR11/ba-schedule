import React from "react";
import {
  Agenda,
  Day,
  Inject,
  Month,
  ScheduleComponent,
  WorkWeek,
  EventSettingsModel,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import scheduleDataFormat from ".././helpers/scheduleDataFormat";
import "../styles/Calender.css";
import setAppointmentColors from "../helpers/setAppointmentColors";

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
function Calendar(this: any, props: Props) {
  const formattedScheduleData = scheduleDataFormat(props.scheduleData);
  const localData: EventSettingsModel = {
    dataSource: formattedScheduleData,
    allowAdding: false,
    allowEditing: false,
    allowDeleting: false,
  };

  function onEventRendered(args: any) {
    setAppointmentColors(args);
    var scheduleObj: any = (document.querySelector(".e-schedule") as any)
      .ej2_instances[0];
    if (scheduleObj.currentView == "Day")
      args.element.classList.add("daySelected");
  }

  return (
    <ScheduleComponent
      eventSettings={localData}
      currentView="WorkWeek"
      workHours={{
        highlight: true,
        start: "08:00",
        end: "19:00",
      }}
      eventRendered={onEventRendered.bind(this)}
    >
      <ViewsDirective>
        <ViewDirective option="Day" startHour="08:00" endHour="21:00" />
        <ViewDirective option="WorkWeek" startHour="08:00" endHour="21:00" />
        <ViewDirective option="Month" showWeekend={false} />
        <ViewDirective option="Agenda" />
      </ViewsDirective>
      <Inject services={[Day, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default Calendar;
