import React from 'react';
import Label from './Label';
import HiddenInput from './HiddenInput';
import { ColorPicker } from 'material-ui-color';
import useFormInput from '../hooks/useFormInput';
import { FormHelperText } from '@material-ui/core';

function isColor(strColor) {
    let s = new Option().style;
    s.color = strColor;
    return s.color !== '';
}

export type ColorInputProps = {
    /**
     * Input name
     */
    name?: string;
    /**
     * Determine whether input is required
     */
    required?: boolean;
    /**
     * Input Label
     */
    label?: React.ReactNode;
    /**
     * Color Value
     */
    value?: any;
    /**
     * A callback function triggered on validation error
     */
     onError?: (errorType: string, errorMessage: string) => void;
    /**
     * A callback function that will be triggered when color is changed
     */
    onChange?: (value: string) => void;
};

export default function ColorInput({ onError = null, name = null, required = false, label, value, onChange = null }: ColorInputProps) {
    const [color, setColor] = React.useState(value || '');
    const [error, setError] = React.useState(null);
    const hasError = Boolean(error);

    const formInput = useFormInput({
        name,
        value: value,
        setError,
        onError,
        required,
    }, [value]);

    const updateColor = color => {
        if (color.css) {
            color = color.css.backgroundColor;
        }

        if (!isColor(color)) {
            color = '';
        }

        setColor(color);

        onChange && onChange(color);
        formInput.requiredValue(color);
    }

    return (
        <>
            <HiddenInput name={name} value={color} />
            <Label label={label} required={required} />
            <ColorPicker
                value={color}
                onChange={updateColor}
            />

            <FormHelperText error={hasError}>{error}</FormHelperText>
        </>
    )
}
