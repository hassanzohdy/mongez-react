import React from 'react';
import './TableFilterForm.scss';
import { Obj } from 'reinforcements';
import useTable from '../hooks/use-table';
import { Button, styled } from '@material-ui/core';
import router, { currentRoute, navigateTo } from '../../router';
import { For, GridContainer, GridItem, Tooltip } from './../../components';
import { SubmitButton, AutoComplete, TextInput, SelectInput, DatePicker } from '../../form';
import { tableFilterEvents } from '../utils/events';

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
        component: AutoComplete,
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

    const allFilters = React.useMemo(() => {
        return filter.map((singleFilter: any) => {
            if (!singleFilter.component && singleFilter.type) {
                singleFilter.component = availableFilters[singleFilter.type].component;
            }

            // if (singleFilter.placeholder && !singleFilter.label) {
            //     singleFilter.label = singleFilter.placeholder;
            // } else if (singleFilter.label && !singleFilter.placeholder) {
            //     singleFilter.placeholder = singleFilter.label;
            // }

            singleFilter.inputProps = Obj.merge({}, availableFilters[singleFilter.type].defaultProps || {}, singleFilter, singleFilter.inputProps);

            delete singleFilter.inputProps.inputProps;
            delete singleFilter.inputProps.component;
            delete singleFilter.inputProps.col;
            delete singleFilter.inputProps.type;

            return singleFilter;
        });
    }, [filter]);

    const [displayedFilters, displayFilters] = React.useState(() => {
        return allFilters.slice(0, 4);
    });

    React.useEffect(() => {
        const subscription = tableFilterEvents.onToggle(expanded => {
            if (expanded) {
                displayFilters([...allFilters]);
            } else {
                displayFilters(allFilters.slice(0, 4));
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <>
            <GridContainerWrapper>
                <For array={displayedFilters} render={singleFilter => (
                    <>
                        <GridItem xs={12} sm={singleFilter.col}>
                            <singleFilter.component {...singleFilter.inputProps} defaultValue={singleFilter.value || queryString.get(singleFilter.query || singleFilter.name)} />
                        </GridItem>
                    </>
                )}
                />
            </GridContainerWrapper>
        </>
    );
}