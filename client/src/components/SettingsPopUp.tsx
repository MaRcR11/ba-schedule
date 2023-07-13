import React from "react";
import ThemeToggle from "./ThemeToggle";
import "../styles/SettingsPopUp.css";
import { SettingsPopUpProps } from "../global/types";
import SettingsOption from "./SettingsOption";

function SettingsPopUp(props: SettingsPopUpProps) {
  return props.trigger ? (
    <div className="hero is-fullheight popup">
      <div className="hero-body is-justify-content-center is-align-items-center">
        <div className="columns is-half is-flex-direction-column box">
          <div className="column is-flex is-justify-content-center">
            <h1 className="is-size-5">Settings</h1>
          </div>
          <div className="column">
            <SettingsOption settingName="Dark/Light-Mode" id="darkLightMode" />
            <SettingsOption settingName="Email notification for upcoming exams" id="emailNotificationUpcomingExams" />
            <SettingsOption settingName="Email notification for exam results" id="emailNotificationExamResults" />
          </div>
          <div className="column">
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
