import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import SubmitButton from './SubmitButton.js';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
function FormModalTitle(props) {
    const classes = useStyles();
    return (React.createElement(AppBar, { className: classes.appBar },
        React.createElement(Toolbar, null,
            React.createElement(IconButton, { edge: "start", color: "inherit", onClick: props.onClose, "aria-label": "close" },
                React.createElement(CloseIcon, null)),
            React.createElement(Typography, { variant: "h6", className: classes.title }, props.title),
            React.createElement(SubmitButton, { color: "inherit" }, trans('save')))));
}

export default FormModalTitle;
