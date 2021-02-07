import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialBackdrop from '@material-ui/core/Backdrop';

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
function Backdrop({ open, onClick, className, position = 'absolute' }) {
    const classes = useStyles();
    const backdropClass = clsx(classes.backdrop, className);
    const style = { position };
    return (React.createElement(MaterialBackdrop, { style: style, className: backdropClass, open: open, onClick: onClick },
        React.createElement(CircularProgress, { color: "inherit" })));
}
function LightBackdrop(propsList) {
    const { className, ...props } = propsList;
    const classes = useStyles();
    const backdropClass = clsx(classes.lightBackdrop, className);
    return React.createElement(Backdrop, Object.assign({}, props, { className: backdropClass }));
}

export default Backdrop;
export { LightBackdrop };
