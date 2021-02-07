import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import Is from '@flk/supportive-is';
import { Collapse } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import useTable from '../hooks/use-table.js';
import TableFilterForm from './TableFilterForm.js';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        color: 'inherit',
        backgroundColor: '#FFF',
        marginBottom: '0.4rem',
    },
    title: {
        flexGrow: 1,
    },
}));
function TableFilter() {
    const classes = useStyles();
    const { options } = useTable();
    const { filter } = options.table || {};
    const [opened, openFilter] = React.useState(true);
    if (Is.empty(filter))
        return null;
    const toggleFilter = () => {
        openFilter(!opened);
    };
    return (React.createElement("div", { className: classes.root },
        React.createElement(AppBar, { className: classes.appBar, position: "static" },
            React.createElement(Toolbar, null,
                React.createElement(IconButton, { onClick: e => toggleFilter() },
                    React.createElement(FilterListIcon, null),
                    React.createElement(Typography, { variant: "h6", className: classes.title }, trans('table.filter')))),
            React.createElement(Collapse, { in: opened },
                React.createElement(TableFilterForm, null)))));
}

export default TableFilter;
