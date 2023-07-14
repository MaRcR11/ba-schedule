import { useEffect, useState } from "react";
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
import { scheduleDataFormat, setAppointmentColors, configureFontColor, configureKeyDownEvents } from "../helpers";
import "../styles/Calendar.css";
import { ScheduleData } from "../global/types";
import SettingsPopUp from "./SettingsPopUp";
interface Props {
  scheduleData: ScheduleData[];
}
function Calendar(this: any, props: Props) {
  const formattedScheduleData = scheduleDataFormat(props.scheduleData);
  const localData: EventSettingsModel = {
    dataSource: formattedScheduleData,
    allowAdding: false,
    allowEditing: false,
    allowDeleting: false,
  };
  const [popUpVisible, setPopUpVisible] = useState(false);

  const onEventRendered = (args: any) => {
    const scheduleObj: any = (document.querySelector(".e-schedule") as any).ej2_instances[0];
    setAppointmentColors(args, scheduleObj);
    if (scheduleObj.currentView == "Day") args.element.classList.add("daySelected");
  };

  useEffect(() => {
    configureSettingsPopUp();
    configureKeyDownEvents();
  }, [ScheduleComponent]);

  const configureSettingsPopUp = () => {
    let rightToolbar = document.getElementsByClassName("e-toolbar-right")[0];
    if (rightToolbar.children[0]?.classList.contains("field")) return;
    let field = document.createElement("div");
    field.classList.add("field");
    let btnSettings = document.createElement("button");
    btnSettings.id = "btn-cogwheel";
    btnSettings.addEventListener("click", () => {
      btnSettings.style.transform = "rotate(90deg)";
      setPopUpVisible(true);
    });
    field.appendChild(btnSettings);
    rightToolbar.prepend(field);
    window.addEventListener("resize", () => {
      field.remove();
      rightToolbar.prepend(field);
    });
  };

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
        dataBound={configureFontColor.bind(this)}
      >
        <ViewsDirective>
          <ViewDirective option="Day" startHour="08:00" endHour="21:00" />
          <ViewDirective option="WorkWeek" startHour="08:00" endHour="21:00" />
          <ViewDirective option="Month" showWeekend={false} />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
      <SettingsPopUp
        popUpVisible={popUpVisible}
        setPopUpVisible={(visible: boolean) => {
          setPopUpVisible(visible);
          if (!visible) document.getElementById("btn-cogwheel")!.style.transform = "rotate(0deg)";
        }}
      />
    </>
  );
}

export default Calendar;
