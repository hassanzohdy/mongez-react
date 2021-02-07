import React from 'react';
import { CircularProgress } from '@material-ui/core';

function CircleProgress({ color = null, position = 'center', ...props }) {
    const style = {};
    if (color) {
        style.color = color;
    }
    const wrapperStyle = {
        textAlign: position
    };
    return React.createElement("div", { style: wrapperStyle },
        React.createElement(CircularProgress, Object.assign({ style: style }, props)));
}

export default CircleProgress;
