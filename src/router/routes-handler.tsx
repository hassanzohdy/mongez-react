import React from 'react';
import Renderer from './renderer';
import history from './router-history';
import { Router, Switch } from 'react-router-dom';
/**
 * Return all application routes
 * 
 * @returns {Array}
 */
export default function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Renderer />
            </Switch>
        </Router>
    );
}
