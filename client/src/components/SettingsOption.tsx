import React from "react";
import ThemeToggle from "./ThemeToggle";
import { SettingsOptionProps } from "../global/types";

function SettingsOption(props: SettingsOptionProps) {
  return (
    <div className="field is-horizontal mb-3 is-block">
      <div className="field-body is-block">
        <div className="field is-narrow is-block">
          <div className="control">
            <div className="field is-grouped is-align-items-center is-justify-content-space-between">
              <span className="option-text mr-6" style={{ fontSize: "0.85rem" }}>
                {props.settingName}
              </span>
              <label className="switch">
                <ThemeToggle checked={props.checked} settingFunction={props.settingFunction} id={props.id} />
              </label>
            </div>
            <hr
              style={
                props.theme === "light"
                  ? { margin: "0", backgroundColor: "#f5f5f5" }
                  : { margin: "0", backgroundColor: "#424242" }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// if darkMode, all hr with backgroundColor: "#424242"
export default SettingsOption;
