import {OptionValue} from "../OptionValue";
import React from "react";

export const PollResult = ({option}) => (
    <div key={option.id}>
        <OptionValue className="display"
                     id={option.id}
                     readOnly={true}
                     value={option.value}/>
        <div className="vote">
                    <span>
                        {option.votes}
                    </span>
        </div>
    </div>
);