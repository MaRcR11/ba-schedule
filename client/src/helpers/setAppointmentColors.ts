import subjects from "../data/subjects.json";

const setAppointmentColors = (args: any, scheduleObj: any) => {
  const { data, element } = args;
  const { currentView } = scheduleObj;

  const matchingSubject = subjects.find((e: any) => data.Subject.includes(e.name));

  if (matchingSubject) {
    const color = data.Location.includes("Prüfung") ? "#D2042D" : matchingSubject.color;

    if (currentView === "Agenda") {
      element.children[0].style.borderColor = color;
    } else {
      element.style.backgroundColor = color;
    }
  }
};

export default setAppointmentColors;
