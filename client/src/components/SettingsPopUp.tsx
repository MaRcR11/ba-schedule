import React, { useEffect, useState } from "react";
import "../styles/SettingsPopUp.css";
import {
  calenderSetLightTheme,
  calenderSetDarkTheme,
  configureFontColor,
  setCorrectCheckingOfThemeToggle,
} from "../helpers";
import { SettingsPopUpProps } from "../global/types";
import SettingsOption from "./SettingsOption";

function SettingsPopUp(props: SettingsPopUpProps) {
  const [theme, setTheme] = useState(localStorage.getItem("mode") as string);

  const setThemeForCheckedToggleOption = (isChecked: boolean) => {
    if (isChecked) {
      calenderSetLightTheme();
      configureFontColor("black");
      localStorage.setItem("mode", "light");
      setTheme("light");
    } else {
      calenderSetDarkTheme();
      configureFontColor("white");
      localStorage.setItem("mode", "dark");
      setTheme("dark");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        props.setPopUpVisible(false);
      }
    });
  }, []);

  return props.popUpVisible ? (
    <div
      className="hero is-fullheight popup"
      onClick={(e) => {
        if (props.popUpVisible && (e.target as HTMLElement).id === "popupBackground") props.setPopUpVisible(false);
      }}
    >
      <div id="popupBackground" className="hero-body is-justify-content-center is-align-items-center">
        <div style={{ position: "relative" }} className="columns is-half is-flex-direction-column box">
          <button
            id="popup-close-btn"
            onClick={() => {
              props.setPopUpVisible(false);
              document.getElementById("btn-cogwheel")!.style.transform = "rotate(0deg)";
            }}
          />
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-5">Settings</h1>
          </div>
          <div className="column">
            <SettingsOption
              checked={setCorrectCheckingOfThemeToggle()}
              settingFunction={setThemeForCheckedToggleOption}
              settingName="Dark/Light-Mode"
              id="darkLightMode"
              theme={theme}
            />
            {/* <SettingsOption
              checked={false}
              settingFunction={() => {}}
              settingName="Email notification for upcoming exams"
              id="emailNotificationUpcomingExams"
              theme={theme}
            />
            <SettingsOption
              checked={false}
              settingFunction={() => {}}
              settingName="Email notification for exam results"
              id="emailNotificationExamResults"
              theme={theme}
            /> */}
          </div>
          <div className="column">
            <button
              className="button is-primary is-fullwidth"
              style={{ marginBottom: "10px", height: "2rem" }}
              type="submit"
              onClick={() => {
                window.open("https://www.ba-schedule.de/timer", "_blank")?.focus();
              }}
            >
              Open Timer
            </button>
            <button className="button is-danger is-fullwidth" type="submit">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default SettingsPopUp;
