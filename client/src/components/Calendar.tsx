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
import {
  scheduleDataFormat,
  setAppointmentColors,
  calenderSetLightTheme,
  calenderSetDarkTheme,
} from "../helpers";
import "../styles/Calendar.css";
import ThemeToggle from "./ThemeToggle";

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

  const onEventRendered = (args: any) => {
    var scheduleObj: any = (document.querySelector(".e-schedule") as any)
      .ej2_instances[0];
    setAppointmentColors(args, scheduleObj);
    if (scheduleObj.currentView == "Day")
      args.element.classList.add("daySelected");
  };

  useEffect(() => {
    configureDarkLightMode();
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
      localStorage.setItem("mode", "light");
    } else {
      calenderSetDarkTheme();
      toggleCheckbox.checked = true;
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
