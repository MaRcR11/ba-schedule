import React, { useEffect, useState } from "react";
import { ThemeToggleProps } from "../global/types";

function ThemeToggle(props: ThemeToggleProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    props.settingFunction(isChecked);
  };

  useEffect(() => {
    setIsChecked(props.checked);
  }, []);

  return (
    <>
      <input
        id={props.id}
        type="checkbox"
        defaultChecked={props.checked}
        onChange={handleToggleChange}
        className="is-rounded switch"
      />
      <label className="toggle unselectable" htmlFor={props.id} />
    </>
  );
}

export default ThemeToggle;
