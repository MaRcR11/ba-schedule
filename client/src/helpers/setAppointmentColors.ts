import * as subjects from "../data/subjects.json";

function setAppointmentColors(args: any) {
  (subjects as any).default.map((e: any) => {
    args.data.Subject.includes(e.name)
      ? (args.element.style.backgroundColor = e.color)
      : null;
  });
}

export default setAppointmentColors;
