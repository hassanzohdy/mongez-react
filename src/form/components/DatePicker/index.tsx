import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import moment from 'moment';
import FormInput from '../FormInput';
import {
    DatePicker as MaterialDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { If } from '../../../components';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Box, IconButton } from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear";

interface DatePickerProps {
    clearable?: boolean;
    [type: string]: any;
}

export default function DatePicker(props: DatePickerProps) {
    let { format = 'dd-mm-yyyy', minYear = null, clearable, yearsOnly = false, value, onChange, ...otherProps } = props;
    let givenValue = value;

    if (yearsOnly) {
        otherProps.views = ["year"];
        format = 'yyyy';

        if (minYear) {
            otherProps.minDate = (new Date()).setFullYear(minYear);
        }

        if (givenValue) {
            givenValue = (new Date()).setFullYear(givenValue);
        }

    } else if (givenValue) {
        givenValue = moment(givenValue, format.toUpperCase()).toDate();
    }

    const [selectedDate, handleDateChange] = React.useState(givenValue || null);

    const onDateSelection = (date: MaterialUiPickersDate) => {
        handleDateChange(date);
        onChange && onChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={1}>
                    <MaterialDatePicker
                        TextFieldComponent={(FormInput as any)}
                        value={selectedDate}
                        animateYearScrolling
                        autoOk
                        {...otherProps}
                        format={format.replace(/m/g, 'M')}
                        onChange={onDateSelection} />
                </Box>
                <Box>
                    <If condition={clearable === true}>
                        <IconButton
                            edge="end"
                            size="small"
                            style={{ marginTop: '1.5rem' }}
                            disabled={!selectedDate}
                            onClick={() => handleDateChange(null)}
                        >
                            <ClearIcon />
                        </IconButton>
                    </If>
                </Box>
            </Box>
        </MuiPickersUtilsProvider>
    );
}