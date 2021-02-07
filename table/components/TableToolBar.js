import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import useTable from '../hooks/use-table.js';
import grey from '@material-ui/core/colors/grey';
import MenuIcon from '@material-ui/icons/ListOutlined';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        color: 'inherit',
        backgroundColor: grey[100],
        marginBottom: '0.4rem',
    },
    title: {
        flexGrow: 1,
    },
}));
function TableToolBar() {
    const classes = useStyles();
    const { options } = useTable();
    const text = trans(options.table.heading);
    const addButtons = options.table.addButtons || [];
    return (React.createElement("div", { className: classes.root },
        React.createElement(AppBar, { className: classes.appBar, position: "static" },
            React.createElement(Toolbar, null,
                React.createElement(IconButton, { edge: "start" },
                    React.createElement(MenuIcon, null)),
                React.createElement(Typography, { variant: "h6", className: classes.title }, text),
                addButtons.map((Button, index) => (React.createElement(Button, { key: index })))))));
}

export default TableToolBar;
