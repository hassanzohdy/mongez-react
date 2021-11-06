import React from 'react';
import Label from './Label';
import HiddenInput from './HiddenInput';
import { InputRule } from './../utils/types';
import { ColorPicker } from 'material-ui-color';
import { useFormInputRegistrar } from '../hooks';
import { FormHelperText } from '@material-ui/core';
import { useBasicRules, useError, useId, useLabel, useName, useValue } from '../hooks/useFormInputProps';
import FormError from './FormError';
import InputError from './InputError';
import { FormContext, validateComponent } from '..';

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
     * Input id
     */
    id?: string;
    /**
     * Color Value
     */
    value?: any;
    /**
     * Validation rules
     */
    rules?: InputRule[];
    /**
     * Color Default Value
     */
    defaultValue?: any;
    /**
     * A callback function triggered on validation error
     */
     onError?: (errorType: string, errorMessage: string) => void;
    /**
     * A callback function that will be triggered when color is changed
     */
    onChange?: (value: string) => void;
};

export default function ColorInput(props: ColorInputProps) {
    // Contexts List
    const { form } = React.useContext(FormContext);
    const id = useId(props);
    const name = useName(props);
    const label = useLabel(props);
    const [color, setColor] = useValue(props);
    const [error, setError] = useError(props);
    const rules = useBasicRules(props);
    useFormInputRegistrar({
        id,
        name,
        value: color,
        props,
        rules,
        setError,
    });

    const updateColor = color => {
        if (color.css) {
            color = color.css.backgroundColor;
        }

        if (!isColor(color)) {
            color = '';
        }

        setColor(color);

        props.onChange && props.onChange(color);

        validateComponent({
            form: form,
            id,
            rules,
            value: color,
            props,
            setError,
        });
    }

    return (
        <>
            <HiddenInput name={name} value={color} />
            <Label label={label} required={props.required} />
            <InputError error={error} />
            <ColorPicker
                value={color}
                onChange={updateColor}
            />

        </>
    )
}
