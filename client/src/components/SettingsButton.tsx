import { SettingsButtonProps } from "../global/types";
import React, { useState } from "react";

function SettingsButton(props: SettingsButtonProps) {
  return (
    <div id="btnSettings" className="field">
      <button
        id="btn-cogwheel"
        style={{ transform: `rotate(${props.rotation}deg)` }}
        onClick={() => {
          props.setRotation(90);
          props.clickEvent(true);
        }}
      ></button>
    </div>
  );
}

export default SettingsButton;
