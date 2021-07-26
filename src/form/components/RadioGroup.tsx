import React from 'react';
import PropTypes from 'prop-types';
import {
    RadioGroup as MaterialRadioGroup,
    FormLabel, FormControl, FormControlLabel, Radio
} from '@material-ui/core';
import { toInputName } from 'reinforcements';

export default function RadioGroup({ value, defaultValue, onChange, inputs, row, label, name, children }) {
    const [currentValue, setValue] = React.useState(String(defaultValue || value));

    const radioInputs = inputs.map(input => {
        const { label, value, disabled, ...otherProps } = input;
        return <FormControlLabel key={value} value={String(value)} disabled={disabled} label={label} control={<Radio color="primary" />} {...otherProps} />;
    });

    const handleChange = e => {
        const value = e.target.value;
        setValue(value);
        onChange(value);
    };

    React.useEffect(() => {
        setValue(String(value));
    }, [value]);

    return (
        <FormControl>
            {label && <FormLabel children={label} />}
            <MaterialRadioGroup row={row} name={toInputName(name)} value={currentValue} onChange={handleChange}>
                {radioInputs || children}
            </MaterialRadioGroup>
        </FormControl>
    )
}

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    inputs: PropTypes.array.isRequired,
    row: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
}

RadioGroup.defaultProps = {
    // row is the direction of setting radio inputs
    // if set to true, then all radio inputs will be inlined in the same line
    row: true,
    onChange: () => { },
};