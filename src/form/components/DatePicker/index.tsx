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
import useFormInput2 from '../../hooks/useFormInput2';
import { FormInput2Props } from '../../utils/types/FormInput';
import InputError from '../InputError';

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
    const { id, value, name, label, defaultValue, onChange, labelPosition, icon, iconPosition, placeholder, readOnly, required, classes, error, hasError, otherProps } = useFormInput2(props as any);

    let { onError = null, format = 'dd-mm-yyyy', minYear = null, clearable, yearsOnly = false, ...moreProps } = otherProps;
    let givenValue = value || defaultValue;

    if (yearsOnly) {
        moreProps.views = ["year"];
        format = 'yyyy';

        if (minYear) {
            moreProps.minDate = new Date();
            moreProps.minDate.setFullYear(minYear as number);
        }

        if (givenValue) {
            givenValue = new Date();
            givenValue.setFullYear(givenValue as any);
        }
    } else if (givenValue) {
        givenValue = moment(givenValue, format.toUpperCase()).toDate();
    }

    const [selectedDate, handleDateChange] = React.useState(givenValue || '');

    const onDateSelection = (date: MaterialUiPickersDate | null) => {
        handleDateChange(date);

        onChange && onChange(date as any, (date) => date);
    };

    const onClear = () => {
        onDateSelection(null);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box display="flex" flexDirection="row">
                {hasError && <InputError classes={classes} error={error} />}

                <Box flexGrow={1}>
                    <MaterialDatePicker
                        TextFieldComponent={(props) => {
                            return <FormInput {...props as any} placeholder={placeholder} required={required}  /> as any;
                        }}
                        // orientation="landscape"
                        value={selectedDate}
                        animateYearScrolling
                        autoOk
                        id={id}
                        name={name}
                        {...moreProps}
                        label={<Label htmlFor={id} required={required}>{label}</Label>}
                        format={format.replace(/m/g, 'M')}
                        onChange={onDateSelection} />
                </Box>
                <Box>
                    <If condition={required === false && clearable === true && Boolean(selectedDate)}>
                        <Tooltip title={trans('clearDate')}>
                            <IconButton
                                edge="end"
                                size="small"
                                style={{ marginTop: '0.5rem' }}
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