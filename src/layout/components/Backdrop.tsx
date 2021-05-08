import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialBackdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    lightBackdrop: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: '#333',
    }
}));

export default function Backdrop({ open, onClick, className, position = 'absolute' }) {
    const classes = useStyles();

    const backdropClass = clsx(classes.backdrop, className);

    const style: any = { position };

    return (
        <MaterialBackdrop style={style} className={backdropClass} open={open} onClick={onClick}>
            <CircularProgress color="inherit" />
        </MaterialBackdrop>
    );
}

export function LightBackdrop(propsList: any) {
    const { className, ...props } = propsList;
    const classes: any = useStyles();

    const backdropClass = clsx(classes.lightBackdrop, className);

    return <Backdrop {...props} className={backdropClass} />
}