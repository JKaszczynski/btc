import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import {TopicForm} from './TopicForm'
import {VotingPage} from './VotingPage'

export const App = () =>
    (
        <div className='App'>
            <Router>
                <Route exact path='/' component={TopicForm}/>
                <Route exact path='/topic' component={TopicForm}/>
                <Route exact path='/topic/:id' component={VotingPage}/>
            </Router>
        </div>
    );


