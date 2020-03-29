import React from 'react';
import './App.css';

export default class VotingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topic: {},
            groups: [],
            results: ''
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleVote = this.handleVote.bind(this);
        this.handleResults = this.handleResults.bind(this);

    }

    componentDidMount() {
        this.handleUpdate();
    }

    handleUpdate() {
        let getData = function (path) {
            let url = this.props.location.pathname;
            let topicId = url.substring(url.lastIndexOf('/') + 1);
            fetch('http://localhost:8080/topic/' + topicId + path, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(function (data) {
                    if (data[0]) {
                        this.setState({groups: data});
                    } else if (data.name) {
                        this.setState({topic: data});
                    }

                }.bind(this))
                .catch(function (err) {
                    console.info(err);
                });
        }.bind(this);

        (function () {
            getData('');
            getData('/groups')
        })();
    }

    handleVote(groupId) {
        fetch('http://localhost:8080/topic/' + this.state.topic.id + '/vote/' + groupId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.text())
            .then(() => this.handleUpdate())
            .catch(function (err) {
                console.info(err);
            });
    }

    renderGroups() {
        return this.state.groups.map((group, key) =>
            <div><input className="display" type="text" id={group.id} readOnly={true} value={group.name}/>
                <button onClick={this.handleVote.bind(this, group.id)}>Vote</button>
            </div>
        );
    }

    renderResults() {
        return this.state.groups.map((group, key) =>
            <div><input className="display" type="text" id={group.id} readOnly={true}
                        value={group.name}/>
                <div className="vote"><span>{group.votes}</span></div>
            </div>
        );
    }

    handleResults() {
        if (this.state.results) {
            this.handleUpdate();
            this.setState({results: false});
        } else {
            this.setState({results: true});
        }
    }

    render() {
        let renderGroups;
        let resultButtonText;
        if (this.state.topic && this.state.topic.name && !this.state.results) {
            resultButtonText = 'Results';
            renderGroups = <div>
                <h2>{this.state.topic.name}</h2>
                <br/>
                {this.renderGroups()}
            </div>
        } else if (this.state.results) {
            resultButtonText = 'Votes';
            renderGroups = <div>
                <h2>{this.state.topic.name}</h2>
                <br/>
                {this.renderResults()}
            </div>
        } else {
            renderGroups = 'Loading...';
        }

        return (
            <div>
                <h2>{renderGroups}</h2>
                <button onClick={this.handleResults}>
                    {resultButtonText}
                </button>
            </div>
        );
    }
}