import React from 'react';
import TimeAgo from './../../../components/TimeAgo';

export default function DateFormatter({ column }) {
    const { value, format = 'human' } = column;

    if (format === 'human') {
        return <TimeAgo timestamp={value.timestamp} />;
    }

    return value.format;
}