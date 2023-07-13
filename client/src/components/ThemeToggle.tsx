import React, { useState } from "react";

interface Props {
    id: string;
}

function ThemeToggle(props: Props) {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="field">
            <input
                id={props.id}
                type="checkbox"
                checked={isChecked}
                onChange={handleToggleChange}
                className="is-rounded switch"
            />
            <label htmlFor={props.id} />
        </div>
    );
}

export default ThemeToggle;