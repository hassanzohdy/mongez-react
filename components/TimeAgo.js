import React from 'react';
import BaseTimeAgo from 'react-timeago';

function TimeAgo(props) {
    let { date, timestamp } = props;
    if (timestamp && !date) {
        date = new Date(timestamp * 1000);
    }
    return React.createElement(BaseTimeAgo, { date: date });
}

export default TimeAgo;
