import {OptionValue} from "../OptionValue";
import {Button} from "../../Button";
import React from "react";

export const PollVote = ({option, handleVote}) => (
    <div key={option.id}>
        <OptionValue className="display"
                     id={option.id}
                     readOnly={true}
                     value={option.value}/>
        <Button onClick={e => handleVote(option.id, e)} value="Vote"/>
    </div>
);