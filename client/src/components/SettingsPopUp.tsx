import React from "react";
import "../styles/SettingsPopUp.css";
import ThemeToggle from "./ThemeToggle";
import { SettingsPopUpProps } from "../global/types";

function SettingsPopUp(props: SettingsPopUpProps) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn button is-danger is-outlined is-small" onClick={() => props.setTrigger(false)}>
          <span className="icon is-small">X</span>
        </button>
        <h1>Einstellungen</h1>
        <div className="element">
          <span>Dark/Light Mode wechseln</span>
          <ThemeToggle></ThemeToggle>
        </div>
        <div id="logout-div">
          <button className="button is-danger">Abmelden</button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default SettingsPopUp;
