import * as subjects from "../data/subjects.json";

function setAppointmentColors(args: any, scheduleObj: any) {
  (subjects as any).default.map((e: any) => {
    args.data.Subject.includes(e.name)
      ? scheduleObj.currentView == "Agenda"
        ? (args.element.children[0].style.borderColor = e.color)
        : (args.element.style.backgroundColor = e.color)
      : null;
  });
}

export default setAppointmentColors;
