import React from 'react';
import moment from 'moment';
import FormInput from '../FormInput';
import DateFnsUtils from '@date-io/date-fns'; 
import {
    DatePicker as MaterialDatePicker,
    MuiPickersUtilsProvider,
    // DatePickerProps as MaterialDatePickerProps,
} from '@material-ui/pickers';
import Label from '../Label';
import { trans } from '../../../localization';
import ClearIcon from "@material-ui/icons/Clear";
import { If, Tooltip } from '../../../components';
import useFormInput from '../../hooks/useFormInput';
import { Box, FormHelperText, IconButton } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

type DatePickerProps = {
    clearable?: boolean;
    format?: string;
    minYear?: number;
    minDate?: string | Date;
    yearsOnly?: boolean;
    name?: string;
    value?: string | Date | number;
    /**
     * A callback function triggered on validation error
     */
    onError?: (errorType: string, errorMessage: string) => void;
    /**
     * A callback function that will be triggered when date is changed
     */
    onChange?: (value: Date) => void;
    [type: string]: any;
}

export default function DatePicker(props: DatePickerProps) {
    let { onError = null, format = 'dd-mm-yyyy', required = false, label = null, minYear = null, clearable, yearsOnly = false, value, onChange, ...otherProps } = props;
    let givenValue = value;

    const [error, setError] = React.useState(null);

    if (yearsOnly) {
        otherProps.views = ["year"];
        format = 'yyyy';

        if (minYear) {
            otherProps.minDate = new Date();
            otherProps.minDate.setFullYear(minYear as number);
        }

        if (givenValue) {
            givenValue = new Date();
            givenValue.setFullYear(givenValue as any);
        }

    } else if (givenValue) {
        givenValue = moment(givenValue, format.toUpperCase()).toDate();
    }

    const [selectedDate, handleDateChange] = React.useState(givenValue || null);

    const formInput = useFormInput({
        name: otherProps.name,
        value: selectedDate,
        setError,
        onError,
        type: 'datePicker',
        required: required,
    }, [selectedDate]);

    const onDateSelection = (date: MaterialUiPickersDate) => {
        handleDateChange(date);

        onChange && onChange(date);

        formInput.requiredValue(date);
    };

    const onClear = () => {
        handleDateChange(null);
        onChange && onChange(null);

        if (required) {
            formInput.requiredValue(false);
        }
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
                        label={<Label required={required}>{trans(label)}</Label>}
                        format={format.replace(/m/g, 'M')}
                        onChange={onDateSelection} />
                </Box>
                <Box>
                    <If condition={clearable === true && Boolean(selectedDate)}>
                        <Tooltip title={trans('clearDate')}>
                            <IconButton
                                edge="end"
                                size="small"
                                style={{ marginTop: '2rem' }}
                                disabled={!selectedDate}
                                onClick={onClear}
                            >
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                    </If>
                </Box>
            </Box>

            <FormHelperText error={Boolean(error)}>{error}</FormHelperText>
        </MuiPickersUtilsProvider>
    );
}