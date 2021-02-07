import React from 'react';
import initiateNavigator from './navigator.js';
import ReactDOM from 'react-dom';
import Routes from './routes-handler.js';
import detectLocaleCodeChange from './detectLocaleCodeChange.js';

/**
 * Scan the entire routes list
 *
 * @returns {void}
 */
function scan() {
    detectLocaleCodeChange();
    initiateNavigator();
    ReactDOM.render(React.createElement(React.StrictMode, null,
        React.createElement(Routes, null)), document.getElementById('root'));
}

export default scan;
