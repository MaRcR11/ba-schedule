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
import {
  scheduleDataFormat,
  setAppointmentColors,
  calenderSetLightTheme,
  calenderSetDarkTheme,
  configureKeyDownEvents,
} from "../helpers";
import "../styles/Calendar.css";
import ThemeToggle from "./ThemeToggle";
import { ScheduleData } from "../global/types";
import ReactDOMServer from "react-dom/server";
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

  const onDataBound = (color: string) => {
    const elements = document.getElementsByClassName("e-appointment");
    const mode = localStorage.getItem("mode");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      element.style.color = `${!color ? (mode === "light" ? "black" : "white") : color}`;
    }
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
    // let toggleCheckbox = themeToggle.children[0] as HTMLInputElement;
    // toggleConfigureCorrectChecking(toggleCheckbox);
    // toggleConfigureOnClickEvent(themeToggle as HTMLDivElement);
    window.addEventListener("resize", () => {
      field.remove();
      rightToolbar.prepend(field);
    });
  };

  const toggleConfigureCorrectChecking = (toggleCheckbox: HTMLInputElement) => {
    try {
      let mode: string = localStorage.getItem("mode") as string;
      toggleCheckbox.checked = mode !== "light";
    } catch (error) {
      console.error("ungültiger Wert im localStorage");
    }
  };

  const toggleConfigureOnClickEvent = (themeToggle: HTMLDivElement) => {
    let openTimerCounter = 0;
    themeToggle.addEventListener("click", (e: Event) => {
      e.preventDefault();
      setThemeForCheckedToggleOption(themeToggle);
      openTimerCounter++;
      if (openTimerCounter >= 5) {
        window.open("https://www.ba-schedule.de/timer", "_blank")?.focus();
        openTimerCounter = 0;
      }
    });
  };

  const setThemeForCheckedToggleOption = (themeToggle: HTMLDivElement) => {
    let toggleCheckbox = themeToggle.children[0] as HTMLInputElement;
    if (toggleCheckbox.checked) {
      calenderSetLightTheme();
      toggleCheckbox.checked = false;
      onDataBound("black");
      localStorage.setItem("mode", "light");
    } else {
      calenderSetDarkTheme();
      toggleCheckbox.checked = true;
      onDataBound("white");
      localStorage.setItem("mode", "dark");
    }
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
        dataBound={onDataBound.bind(this)}
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
        trigger={popUpVisible}
        setTrigger={(bool: boolean) => {
          setPopUpVisible(bool);
          if (!bool) document.getElementById("btn-cogwheel")!.style.transform = "rotate(0deg)";
        }}
      />
    </>
  );
}

export default Calendar;
