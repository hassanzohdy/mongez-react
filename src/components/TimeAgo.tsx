import React from 'react';
import config from '../config';
import Globals from '../globals';
import Tooltip from './Tooltip';
import BaseTimeAgo from 'react-timeago';

interface TimeAgoProps {
    timestamp?: number;
    date?: string | Date;
    [key: string]: any;
    tooltip?: boolean;
}

export default function TimeAgo(props: TimeAgoProps) {
    let { date, timestamp } = props;

    if (timestamp && !date) {
        date = new Date(timestamp * 1000);
    }

    const time = <BaseTimeAgo formatter={config.get('timeAgo.formatters.' + Globals.localeCode)} date={date} />;

    if (props.tooltip) {
        return (
            <Tooltip title={date.toLocaleString()}>
                <span>{time}</span>
            </Tooltip>
        )
    }

    return time;
}