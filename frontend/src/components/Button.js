import React from "react";

export const Button = (props) => (
    <input
        type="button"
        onClick={props.onClick}
        value={props.value}
        disabled={props.disabled}
    />
);