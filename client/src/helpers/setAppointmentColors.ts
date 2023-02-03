import * as subjects from "../data/subjects.json";

function setAppointmentColors(args: any, scheduleObj: any) {
  (subjects as any).default.map((e: any) => {
    let color = null;

    if (args.data.Subject.includes("Fachenglisch")) {
      console.log(args.data.Subject);
    }
    if (args.data.Location.includes("Prüfung")) {
      console.log(args.data.Subject);
      color = "#D2042D";
    }

    args.data.Subject.includes(e.name)
      ? scheduleObj.currentView == "Agenda"
        ? (args.element.children[0].style.borderColor =
            color === null ? e.color : color)
        : (args.element.style.backgroundColor =
            color === null ? e.color : color)
      : null;
  });
}

export default setAppointmentColors;
