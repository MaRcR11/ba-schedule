import { useEffect } from "react";
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
import { scheduleDataFormat, setAppointmentColors, calenderSetLightTheme, calenderSetDarkTheme } from "../helpers";
import "../styles/Calendar.css";
import ThemeToggle from "./ThemeToggle";
import { ScheduleData } from "../global/types";
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
    configureDarkLightMode();
    configureKeyDownEvents();
  }, [ScheduleComponent]);

  const configureDarkLightMode = () => {
    let rightToolbar = document.getElementsByClassName("e-toolbar-right")[0];
    if (rightToolbar.children[0]?.classList.contains("field")) return;
    let themeToggle = ThemeToggle();
    rightToolbar.prepend(themeToggle);
    let toggleCheckbox = themeToggle.children[0] as HTMLInputElement;
    toggleConfigureCorrectChecking(toggleCheckbox);
    toggleConfigureOnClickEvent(themeToggle);
    window.addEventListener("resize", () => {
      themeToggle.remove();
      rightToolbar.prepend(themeToggle);
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
      if (openTimerCounter >= 5000) {
        window.open("https://www.cs21-2-schedule.de/timer", "_blank")?.focus();
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

  const configureKeyDownEvents = () => {
    window.addEventListener("keydown", (e) => {
      const btn1 = document.getElementById("e-tbr-btn_1");
      const btn0 = document.getElementById("e-tbr-btn_0");

      switch (e.key) {
        case "Right":
        case "ArrowRight":
          e.preventDefault();
          btn1?.click();
          btn1?.blur();
          break;
        case "Left":
        case "ArrowLeft":
          e.preventDefault();
          btn0?.click();
          btn0?.blur();
          break;
        default:
          break;
      }
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
    </>
  );
}

export default Calendar;
