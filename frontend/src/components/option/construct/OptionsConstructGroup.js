import {Button} from "../../Button";
import React from "react";
import {OptionConstruct} from "./OptionConstruct"

export const OptionsConstructGroup = (props) => {
    return (<div>
            {props.options.data.map((option) => (
                <OptionConstruct
                    key={option.id}
                    id={option.id}
                    value={option.value}
                    onChange={props.onChange}
                    onDelete={props.onDelete}/>
            ))}
            <Button value="Add option"
                    onClick={props.onAdd}
                    disabled={props.options.isFull}/>
        </div>
    )
};