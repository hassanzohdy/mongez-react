import React from 'react';
import './TableFilterForm.scss';
import { Obj } from 'reinforcements';
import useTable from '../hooks/use-table';
import { trans } from '../../localization';
import { Button, styled } from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import ColoredIcon from '../../components/ColoredIcon';
import router, { currentRoute, navigateTo } from '../../router';
import { For, GridContainer, GridItem, Tooltip } from './../../components';
import { SubmitButton, AutoComplete, TextInput, SelectInput, DatePicker } from '../../form';

const CircleButton = styled(Button)({});

const GridContainerWrapper = styled(GridContainer)({
    padding: '0.5rem 2.5rem',
    width: '100%',
});

const availableFilters = {
    search: {
        component: TextInput,
        defaultProps: {
            margin: 'dense',
        }
    },
    date: {
        component: DatePicker,
        defaultProps: {
            margin: 'dense',
        }
    },
    select: {
        component: SelectInput,
        defaultProps: {
            margin: 'dense',
        }
    },
    autocomplete: {
        component: AutoComplete,
        defaultProps: {
            margin: 'none',
            classes: {
                root: 'filter-autocomplete-root',
            },
            InputProps: {
                margin: 'dense',
                // style: {
                //     // marginTop: Globals.direction === 'rtl' ? '0.5rem' : '0.5rem',
                // }
            }
        }
    },
};

export default function TableFilterForm() {
    const { options } = useTable();

    const { filter } = options.table || {};

    const queryString = router.queryString;

    filter.forEach((singleFilter: any) => {
        if (!singleFilter.component && singleFilter.type) {
            singleFilter.component = availableFilters[singleFilter.type].component;
        }

        singleFilter.inputProps = Obj.merge({}, availableFilters[singleFilter.type].defaultProps || {}, singleFilter, singleFilter.inputProps);

        delete singleFilter.inputProps.inputProps;
        delete singleFilter.inputProps.component;
        delete singleFilter.inputProps.col;
        delete singleFilter.inputProps.type;
    });

    const resetForm = () => {
        navigateTo(currentRoute());
    };

    return (
        <>
            <GridContainerWrapper>
                <For array={filter} render={singleFilter => (
                    <GridItem xs={12} sm={singleFilter.col}>
                        <singleFilter.component {...singleFilter.inputProps} value={singleFilter.value || queryString.get(singleFilter.query || singleFilter.name)} />
                    </GridItem>
                )}
                />

                <GridItem sm={2}>
                    <SubmitButton color="primary" className="filter-form-btn" variant="contained" >{trans('table.filter')}</SubmitButton>
                    {options.resetFilterButton !== false &&
                        <Tooltip title={trans('table.reset')}>
                            <CircleButton className="filter-form-btn" onClick={resetForm}>
                                <ColoredIcon icon={ReplayIcon} color="orange" />
                            </CircleButton>
                        </Tooltip>
                    }
                </GridItem>
            </GridContainerWrapper>
        </>
    );
}