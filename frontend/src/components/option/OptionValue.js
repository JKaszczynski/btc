import React from "react";

export const OptionValue = ({
                                id,
                                value,
                                onChange,
                                className = "",
                                readOnly = false,
                                placeHolder = "",
                            }) => (
    <input
        type="text"
        id={id}
        placeholder={placeHolder}
        value={value}
        onChange={e => onChange(id, e)}
        readOnly={readOnly}
        className={className}
    />
);