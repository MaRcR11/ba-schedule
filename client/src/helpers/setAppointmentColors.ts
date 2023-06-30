import subjects from "../data/subjects.json";
import hexToRgb from "./hexToRgb";

const setAppointmentColors = (args: any, scheduleObj: any) => {
  const { data, element } = args;
  const { currentView } = scheduleObj;

  const matchingSubject = subjects.find((e: any) => data.Subject.includes(e.name));

  if (matchingSubject) {
    const color = data.Location.includes("Prüfung") ? "#D2042D" : matchingSubject.color;

    if (currentView === "Agenda") {
      element.children[0].style.borderColor = color;
    } else {
      element.style.borderColor = color;
      element.style.backgroundColor =`rgba(${[...hexToRgb(color)]}, ${0.2})`;
    }
  }
};

export default setAppointmentColors;
