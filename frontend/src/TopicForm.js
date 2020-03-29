import React from 'react';
import {
    Redirect,
} from "react-router-dom";

export default class TopicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            value: '',
            groups: [{name: ''}]
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGroupNameChange = this.handleGroupNameChange.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);

    }

    handleNameChange(event) {
        this.setState({value: event.target.value});
    }

    handleGroupNameChange(id, event) {
        const newGroups = this.state.groups.map((group, idx) => {
            if (id !== idx) return group;
            return {...group, name: event.target.value};
        });

        this.setState({groups: newGroups});
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/topic', {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'name': this.state.value})
        })
            .then(response => response.json())
            .then(function (data) {
                addGroups(data.id);
            })
            .catch(function (err) {
                console.info(err);
            });

        let addGroups = function (topicId) {
            fetch('http://localhost:8080/topic/' + topicId + '/groups', {
                method: 'POST',
                redirect: 'follow',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.groups)
            })
                .then(response => response.json())
                .then(function (data) {
                    this.setState({
                        isFetching: true,
                        topic: {
                            id: topicId,
                            name: this.state.value
                        },
                        groups: data
                    })
                }.bind(this))
                .catch(function (err) {
                    console.info(err);
                });
        }.bind(this)
    }

    handleAddGroup() {
        if (this.state.groups.length >= 5) {
            return;
        }
        if (this.state.groups.length === 4) {
            document.getElementById('addGroupButton').style.visibility = 'hidden';
        }
        this.setState({
            groups: this.state.groups.concat([{name: ""}])
        });
    }

    render() {
        if (this.state.isFetching) {
            const path = '/topic/' + this.state.topic.id;
            return <Redirect to={path}/>
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text"
                               placeholder="Topic name"
                               value={this.state.value}
                               onChange={this.handleNameChange}/>
                    </label>
                    <h4>Groups</h4>
                    {this.state.groups.map((group, idx) => (
                        <div className="group">
                            <input
                                type="text"
                                placeholder={`group #${idx + 1} name`}
                                value={group.name}
                                onChange={this.handleGroupNameChange.bind(this, idx)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={this.handleAddGroup}
                        id="addGroupButton"
                    >
                        Add Group
                    </button>

                    <input type="submit" value="Create"/>
                </form>
            );
        }
    }
}