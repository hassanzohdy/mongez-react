import React from 'react';
import config from '../config';
import Globals from '../globals';
import BaseTimeAgo from 'react-timeago';

interface TimeAgoProps {
    timestamp?: number;
    date?: string | Date;
    [key: string]: any;
}

export default function TimeAgo(props: TimeAgoProps) {
    let { date, timestamp } = props;

    if (timestamp && !date) {
        date = new Date(timestamp * 1000);
    }

    return <BaseTimeAgo formatter={config.get('timeAgo.formatters.' + Globals.localeCode)} date={date} />;
}