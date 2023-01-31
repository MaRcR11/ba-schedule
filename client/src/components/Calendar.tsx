import React, { useEffect, useRef } from "react";
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
import { scheduleDataFormat, setAppointmentColors } from "../helpers";
import "../styles/Calendar.css";
import DesignToggle from "./DesignToggle";

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
    var scheduleObj: any = (document.querySelector(".e-schedule") as any)
      .ej2_instances[0];
    setAppointmentColors(args, scheduleObj);
    if (scheduleObj.currentView == "Day")
      args.element.classList.add("daySelected");
  }

  useEffect(() => {
    let toolbar = document.getElementsByClassName("e-toolbar-right");
    if (!toolbar[0].children[0].classList.contains("field")) {
      let toggle = DesignToggle();
      toolbar[0].prepend(toggle);
    }
  }, [ScheduleComponent]);

  return (
    <>
      <ScheduleComponent
        eventSettings={localData}
        currentView="WorkWeek"
        workHours={{
          highlight: true,
          start: "08:00",
          end: "21:00",
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
    </>
  );
}

export default Calendar;
