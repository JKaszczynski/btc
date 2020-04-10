import React from "react";
import "./App.css";
import {Button} from "./Button"
import {postRequest, getRequest} from "./http-request";
import {optionReducer} from "./option/vote/fetch-options-reducer";
import {PollResult} from "./option/vote/PollResult"
import {PollVote} from "./option/vote/PollVote"

export const VotingPage = (props) => {
    const getTopicId = () => {
        let url = props.location.pathname;
        return url.substring(url.lastIndexOf("/") + 1);
    };

    const [options, dispatchOptions] = React.useReducer(
        optionReducer,
        {data: [], isLoading: false, isError: false}
    );

    const ButtonTextEnum = {result: 'Result', votes: 'Votes'};

    const [topic, setTopic] = React.useState({id: getTopicId()});
    const [resultButtonText, setResultButtonText] = React.useState(ButtonTextEnum.result);

    const getTopicData = () => {
        getData("")
            .then((data) => setTopic(data))
    };

    const getOptionData = () => {
        getData("options")
            .then((data) => dispatchOptions({
                type: 'OPTIONS_FETCH_SUCCESS',
                payload: data
            }))
            .catch(() => {
                if (options.data.length === 0) {
                    dispatchOptions({type: 'OPTIONS_FETCH_FAILURE'});
                }
            });
    };

    let getData = (path) => (
        getRequest(`${topic.id}/${path}`));

    const getPollInfo = () => {
        dispatchOptions({type: 'OPTIONS_FETCH_INIT'});
        getTopicData();
        getOptionData();
    };

    React.useEffect(getPollInfo, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            updateVotes()
        }, 1000);
        return () => clearInterval(interval)
    });

    const updateVotes = () => {
        getOptionData();
    };

    const handleVote = (optionId) => {
        postRequest(`${topic.id}/vote/${optionId}`)
            .catch(function (err) {
                console.info(err);
            });
    };

    const renderVoting = () => {
        return options.data.map((option) =>
            <PollVote option={option}
                      handleVote={handleVote}/>
        );
    };

    const renderResults = () => {
        return options.data.map((option) =>
            <PollResult option={option}/>
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

    if (options.isLoading) {
        return "Loading...";
    }
    if (options.isError) {
        return "Something went wrong...";
    }
    return (
        <div>
            <h2>{topic.name}</h2>
            <br/>
            {resultButtonText === ButtonTextEnum.votes ? renderResults() : renderVoting()}
            <Button onClick={handleResults}
                    value={resultButtonText}/>
        </div>
    );
};