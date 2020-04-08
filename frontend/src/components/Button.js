import React from "react";

export const Button = (props) => (
    <input
        type="button"
        onClick={props.onClick}
        id={props.id}
        value={props.value}
    />
);