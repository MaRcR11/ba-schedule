function setAppointmentColors(args: any) {
  if (args.data.Subject.includes("Algorithmen")) {
    args.element.style.backgroundColor = "#d64161";
  } else if (args.data.Subject.includes("Betriebssysteme")) {
    args.element.style.backgroundColor = "#86af49";
  } else if (args.data.Subject.includes("Fachenglisch")) {
    args.element.style.backgroundColor = "#622569";
  } else if (args.data.Subject.includes("Nutzerinterakt.")) {
    args.element.style.backgroundColor = "#667292";
  } else if (args.data.Subject.includes("Stochastik")) {
    args.element.style.backgroundColor = "#4040a1";
  }
}

export default setAppointmentColors;
