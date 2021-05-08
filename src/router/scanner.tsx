import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes-handler';
import initiateNavigator from "./navigator";
import detectLocaleCodeChange from "./detectLocaleCodeChange";

/**
 * Scan the entire routes list
 * 
 * @returns {void}
 */
export default function scan() {
    detectLocaleCodeChange();
    initiateNavigator();

    ReactDOM.render(
        <React.StrictMode>
            <Routes />
        </React.StrictMode>,
        document.getElementById('root')
    );
}