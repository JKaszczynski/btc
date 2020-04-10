import React from "react";
import {Redirect} from "react-router-dom";
import {postRequest} from "./http-request";
import {optionReducer} from "./option/construct/create-options-reducer";
import {OptionsConstructGroup} from "./option/construct/OptionsConstructGroup";

export const TopicForm = () => {

    const [options, dispatchOptions] = React.useReducer(
        optionReducer,
        {data: [], isFull: false}
    );

    const [isSubmitted, setSubmitted] = React.useState(false);
    const [topic, setTopic] = React.useState({name: ""});

    const handleNameChange = (event) => {
        setTopic({name: event.target.value});
    };

    const handleOptionChange = (id, event) => {
        dispatchOptions({
            type: "CHANGE_VALUE",
            payload: {
                id: id,
                value: event.target.value
            }
        });
    };

    const handleAddOption = () => {
        dispatchOptions({type: "ADD_OPTION"});
    };

    const handleRemoveOption = (id) => {
        dispatchOptions({
            type: "REMOVE_OPTION",
            payload: {id: id}
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postRequest("", {"name": topic.name})
            .then((data) => persistOptions(data.id))
            .catch((err) => {
                console.info(err);
            });

        const persistOptions = (topicId) => {
            postRequest(`${topicId}/options`, options.data)
                .then(() => {
                    setTopic({id: topicId, name: topic.name});
                    setSubmitted(true);
                })
                .catch((err) => {
                    console.info(err);
                });
        }
    };

    if (isSubmitted) {
        const path = "/topic/" + topic.id;
        return <Redirect to={path}/>
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <Topic topic={topic}
                       onChange={handleNameChange}/>
                <h4>Add options</h4>
                <OptionsConstructGroup options={options}
                                       onChange={handleOptionChange}
                                       onAdd={handleAddOption}
                                       onDelete={handleRemoveOption}/>
                <input type="submit" value="Create"/>
            </form>
        );
    }
};

const Topic = ({topic, onChange}) => (
    <label>
        <input type="text"
               placeholder="Topic name"
               value={topic.name}
               onChange={onChange}/>
    </label>
);