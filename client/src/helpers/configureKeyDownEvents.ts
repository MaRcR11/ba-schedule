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
            case 'Day':
              btnWeek?.click();
              btnWeek?.blur();
              break;
            case 'WorkWeek':
              btnMonth?.click();
              btnMonth?.blur();
              break;
            case 'Month':
              btnAgenda?.click();
              btnAgenda?.blur();
              break;
            case 'Agenda':
              btnDay?.click();
              btnDay?.blur();
              break;
            default:
              break;
          }
        case 't':
          btnToday?.click();
          btnToday?.blur();
          break;
        default:
          break;
      }
    });
  };


  export default configureKeyDownEvents;