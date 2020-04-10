import React from "react";
import {Button} from "../../Button";
import {OptionValue} from "../OptionValue";

export const OptionConstruct = ({
                           id,
                           value,
                           onChange,
                           onDelete
                       }) => (
    <div>
        <OptionValue
            id={id}
            value={value}
            onChange={onChange}
            placeHolder={`Option #${id}`}
        />
        <Button value="Delete"
                onClick={() => onDelete(id)}/>
    </div>
);