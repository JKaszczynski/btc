import React from "react";
import "./App.css";
import {Button} from "./Button"
import {postRequest, getRequest} from "./HttpRequest";

export const VotingPage = (props) => {
    const getTopicId = () => {
        let url = props.location.pathname;
        return url.substring(url.lastIndexOf("/") + 1);
    };

    const ButtonTextEnum = {result: 'Result', votes: 'Votes'};

    const [groups, setGroups] = React.useState([{id: 0, name: '', votes: 0}]);
    const [topic, setTopic] = React.useState({id: getTopicId()});
    const [resultButtonText, setResultButtonText] = React.useState(ButtonTextEnum.result);

    const getTopicData = () => {
        getData("")
            .then((data) => setTopic(data))
    };

    const getGroupData = () => {
        getData("groups")
            .then((data) => setGroups(data))
    };

    let getData = (path) => (
        getRequest(`${topic.id}/${path}`));

    const getPollInfo = () => {
        getTopicData();
        getGroupData();
    };

    React.useEffect(getPollInfo, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            updateVotes()
        }, 1000);
        return () => clearInterval(interval)
    });

    const updateVotes = () => {
        getGroupData();
    };

    const handleVote = (groupId) => {
        postRequest(`${topic.id}/vote/${groupId}`)
            .catch(function (err) {
                console.info(err);
            });
    };

    const renderGroups = () => {
        return groups.map((group) =>
            <div key={group.id}>
                <Group group={group}/>
                <Button onClick={e => handleVote(group.id, e)} value="Vote"/>
            </div>
        );
    };

    const renderResults = () => {
        return groups.map((group) =>
            <div key={group.id}>
                <Group group={group}/>
                <div className="vote">
                    <span>
                        {group.votes}
                    </span>
                </div>
            </div>
        );
    };

    const handleResults = () => {
        if (resultButtonText === ButtonTextEnum.result) {
            updateVotes();
            setResultButtonText(ButtonTextEnum.votes);
        } else {
            setResultButtonText(ButtonTextEnum.result);
        }
    };

    const isPollReady = () => (topic && topic.name);
    if (!isPollReady) {
        return "Loading...";
    }
    return (
        <div>
            <h2>{topic.name}</h2>
            <br/>
            {resultButtonText === ButtonTextEnum.votes ? renderResults() : renderGroups()}
            <Button onClick={handleResults}
                    value={resultButtonText}/>
        </div>
    );
};

const Group = ({group}) => (<input className="display"
                                   type="text"
                                   id={group.id}
                                   readOnly={true}
                                   value={group.name}/>);