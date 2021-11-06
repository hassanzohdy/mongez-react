import React from 'react';
import config from './../config';
import BaseTooltip from '@material-ui/core/Tooltip';

import { Button, Popup } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tooltip: {
        backgroundColor: config.get('tooltip.backgroundColor', '#000'),
    }
});

export default function Tooltip({ title, as = 'span', children, ...props }) {
    const Component: any = as;

    return (
        <Component className={props.className}>
            <Popup
                // style={{ zIndex: 100000, padding: '0.3rem', fontWeight: 'bold' }}
                style={{ zIndex: 100000, }}
                trigger={children}
                content={title}
                inverted
                size="mini"
                position="top center"
                {...props}
            />
        </Component>
    )
    // const classes = useStyles();

    // return <BaseTooltip classes={{ tooltip: classes.tooltip }} placement="top" {...props} />
}