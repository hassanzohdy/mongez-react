import React from 'react';
import useTable from '../hooks/use-table';
import { trans } from './../../localization';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/ListOutlined';
import { Obj } from 'reinforcements';

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

export default function TableToolBar() {
    const classes = useStyles();

    const { options } = useTable();

    const text = trans(options.table.heading);

    const addButtons = options.table.addButtons || [];

    if (options.table.disableToolbar === true) return null;

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <IconButton edge="start" >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {text}
                    </Typography>
                    {addButtons.map((Button, index) => (
                        <Button key={index} />
                    ))}
                </Toolbar>
            </AppBar>
        </div>
    );
}