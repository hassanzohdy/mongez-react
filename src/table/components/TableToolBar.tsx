import React from 'react';
import './TableToolBar.scss';
import useTable from '../hooks/use-table';
import { trans } from './../../localization';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/ListOutlined';
import { Box } from '@material-ui/core';
import { Checkbox, Dropdown } from 'semantic-ui-react';

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

    const { options, displayedColumns, setDisplayedColumns } = useTable();

    const [tableColumnsOptions] = React.useState(() => {
        return options.table.columns.map(column => {
            return {
                text: trans(column.heading),
                value: column.key,
                readOnly: !column.displayMode || column.displayMode === 'always',
            };
        });
    });

    const text = trans(options.table.heading);

    const addButtons = options.table.addButtons || [];

    if (options.table.disableToolbar === true) return null;

    const selectColumn = (e, column) => {
        if (column.checked === true) {
            if (displayedColumns.includes(column.value) === false) {
                setDisplayedColumns([...displayedColumns, column.value]);
            }
        } else {
            displayedColumns.splice(displayedColumns.indexOf(column.value), 1);
            setDisplayedColumns([...displayedColumns]);
        }
    }

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

                    <Box className="table-columns-selector" display="flex" mx={2}>
                        <Dropdown item simple text={trans('table.displayedColumns')}>
                            <Dropdown.Menu>
                                {tableColumnsOptions.map(({ text, value, readOnly }) => (
                                    <Dropdown.Item key={value}>
                                        <Checkbox label={text} readOnly={readOnly} checked={displayedColumns.includes(value)} value={value} onChange={selectColumn} />
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Box>
                    {addButtons.map((Button, index) => (
                        <Button key={index} />
                    ))}
                </Toolbar>
            </AppBar>
        </div>
    );
}