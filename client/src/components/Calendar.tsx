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
  const configureKeyDownEvents = () => {
    window.addEventListener("keydown", (e) => {
      const scheduleObj: any = (document.querySelector(".e-schedule") as any).ej2_instances[0];
      const btnBackwards = document.getElementById("e-tbr-btn_0");
      const btnForward = document.getElementById("e-tbr-btn_1");
      const btnToday = document.getElementById("e-tbr-btn_3");
      const btnDay = document.getElementById("e-tbr-btn_4");
      const btnWeek = document.getElementById("e-tbr-btn_5");
      const btnMonth = document.getElementById("e-tbr-btn_6");
      const btnAgenda = document.getElementById("e-tbr-btn_7");

      switch (e.key) {
        case "Right":
        case "ArrowRight":
          e.preventDefault();
          btnForward?.click();
          btnForward?.blur();
          break;
        case "Left":
        case "ArrowLeft":
          e.preventDefault();
          btnBackwards?.click();
          btnBackwards?.blur();
          break;
        case "m":
          switch (scheduleObj.currentView) {
            case "Day":
              btnWeek?.click();
              btnWeek?.blur();
              break;
            case "WorkWeek":
              btnMonth?.click();
              btnMonth?.blur();
              break;
            case "Month":
              btnAgenda?.click();
              btnAgenda?.blur();
              break;
            case "Agenda":
              btnDay?.click();
              btnDay?.blur();
              break;
            default:
              break;
          }
        case "t":
          btnToday?.click();
          btnToday?.blur();
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
