import React from 'react';
import Is from '@flk/supportive-is';
import useTable from '../hooks/use-table';
import { trans } from './../../localization';
import { Box, Collapse } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TableFilterForm from './TableFilterForm';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import ReplayIcon from '@material-ui/icons/Replay';
import ColoredIcon from '../../components/ColoredIcon';
import { Button, styled } from '@material-ui/core';
import { Tooltip } from './../../components';
import { SubmitButton } from '../../form';
import { currentRoute, navigateTo } from '../../router';
import { tableFilterEvents } from '../utils/events';

const CircleButton = styled(Button)({});

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

export default function TableFilter() {
    const classes = useStyles();

    const { options } = useTable();

    const { filter } = options.table || {};

    const [opened, openFilter] = React.useState(true);

    if (Is.empty(filter)) return null;

    const toggleFilter = () => {
        openFilter(!opened);
    };

    const resetForm = () => {
        navigateTo(currentRoute());
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <IconButton onClick={e => toggleFilter()}>
                            <FilterListIcon />
                            <Typography variant="h6" className={classes.title}>
                                {trans('table.filter')}
                            </Typography>
                        </IconButton>
                    </Box>
                    <Box display="flex">
                        <SubmitButton color="primary" className="filter-form-btn" variant="contained" >{trans('table.filter')}</SubmitButton>
                        {filter.length > 4 &&
                            <Tooltip title={trans('table.filter.expand')}>
                                <CircleButton onClick={() => tableFilterEvents.toggle()}>
                                    <ColoredIcon icon={FilterListIcon} color="green" />
                                </CircleButton>
                            </Tooltip>
                        }

                        {options.resetFilterButton !== false &&
                            <Tooltip title={trans('table.reset')}>
                                <CircleButton className="filter-form-btn" onClick={resetForm}>
                                    <ColoredIcon icon={ReplayIcon} color="orange" />
                                </CircleButton>
                            </Tooltip>
                        }
                    </Box>
                </Toolbar>
                <Collapse in={opened}>
                    <TableFilterForm />
                </Collapse>
            </AppBar>
        </div>
    );
}