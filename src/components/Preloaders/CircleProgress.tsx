import React from 'react';
import { CircularProgress as Progress } from '@material-ui/core';

export default function CircleProgress({ color = null, position = 'center', ...props }) {
    const style: any = {};

    if (color) {
        style.color = color;
    }

    const wrapperStyle: any = {
        textAlign: position
    };

    return <div style={wrapperStyle}><Progress style={style} {...props} /></div>
}