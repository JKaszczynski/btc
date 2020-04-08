import React from "react";
import {Redirect} from "react-router-dom";
import {Button} from "./Button"
import {postRequest} from "./HttpRequest";

export const TopicForm = () => {

    const [isFetching, setFetching] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [groups, setGroups] = React.useState([]);
    const [topic, setTopic] = React.useState({});

    const handleNameChange = (event) => {
        setValue(event.target.value);
    };

    const handleGroupNameChange = (id, event) => {
        const newGroups = groups.map((group) => {
            if (group.id !== id) return group;
            return {...group, name: event.target.value};
        });

        setGroups(newGroups);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        postRequest("", {"name": value})
            .then((data) => {
                persistGroups(data.id);
            })
            .catch((err) => {
                console.info(err);
            });

        const persistGroups = (topicId) => {
            postRequest(`${topicId}/groups`, groups)
                .then(function (data) {
                    setGroups(data);
                    setTopic({id: topicId, name: value});
                    setFetching(true);
                })
                .catch((err) => {
                    console.info(err);
                });
        }
    };

    const handleAddGroup = () => {
        const groupLimit = 5;
        if (groups.length >= groupLimit) {
            return;
        }
        const newGroups = groups.concat([{id: groups.length + 1, name: ""}]);
        setGroups(newGroups);
        toggleButtonVisibility(newGroups.length);
    };

    const handleRemoveGroup = (id) => {
        if (groups.length === 0) {
            return;
        }
        let newGroups = groups.filter((group) => (group.id !== id));
        newGroups = newGroups.map((group, inx) => ({...group, id: inx + 1}));
        setGroups(newGroups);
        toggleButtonVisibility(newGroups.length);
    };

    const toggleButtonVisibility = (arraySize) => {
        const groupLimit = 5;
        if (arraySize === groupLimit) {
            document.getElementById("addGroupButton").disabled = true;
        } else if (arraySize === groupLimit - 1) {
            document.getElementById("addGroupButton").disabled = false;
        }
    };

    if (isFetching) {
        const path = "/topic/" + topic.id;
        return <Redirect to={path}/>
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <Topic value={value}
                       onChange={handleNameChange}/>
                <h4>Groups</h4>
                <Groups groups={groups}
                        handleNameChange={handleGroupNameChange}
                        handleAddGroup={handleAddGroup}
                        handleDeleteGroup={handleRemoveGroup}/>

                <input type="submit" value="Create"/>
            </form>
        );
    }

};

const Topic = (props) => (
    <label>
        <input type="text"
               placeholder="Topic name"
               value={props.value}
               onChange={props.onChange}/>
    </label>
);

const Groups = (props) => {
    return (<div>
            {props.groups.map((group) => (
                <Group
                    key={group.id}
                    id={group.id}
                    value={group.name}
                    onChange={props.handleNameChange}
                    onDelete={props.handleDeleteGroup}/>
            ))}
            <Button value="Add Group"
                    onClick={props.handleAddGroup}
                    id="addGroupButton"/>
        </div>
    )
};

const Group = (props) => (
    <div className="group">
        <input
            type="text"
            id={props.id}
            placeholder={`group #${props.id} name`}
            value={props.value}
            onChange={e => props.onChange(props.id, e)}
        />
        <Button value="Delete"
                onClick={() => props.onDelete(props.id)}/>
    </div>
);