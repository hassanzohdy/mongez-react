import history from './router-history.js';
import React from 'react';
import { Router, Switch } from 'react-router-dom';
import Renderer from './renderer.js';

/**
 * Return all application routes
 *
 * @returns {Array}
 */
function Routes() {
    return (React.createElement(Router, { history: history },
        React.createElement(Switch, null,
            React.createElement(Renderer, null))));
}

export default Routes;
