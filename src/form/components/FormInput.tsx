import React from 'react';
import Label from './Label';
import Is from '@flk/supportive-is';
import config from './../../config';
import rulesList from '../utils/rules-list';
import { trans } from './../../localization';
import { toInputName } from 'reinforcements';
import useFormInput from '../hooks/useFormInput';
import { InputRule } from '../validation/rules/input-rule';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';

export type InputProps = TextFieldProps & {
    label?: string;
    readOnly?: boolean;
    rules?: InputRule[];
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
}

function prepareValue(value) {
    return !Is.empty(value) ? value : '';
}

export default function FormInput(props: InputProps) {
    const { icon, iconPosition = 'start', InputProps: baseInputProps, rules = config.get('form.input.rulesList', rulesList), value, defaultValue, readOnly, required, variant = config.get('form.input.variant', 'outlined'), onInput, name, ...otherProps } = props;
    const [internalValue, setValue] = React.useState(prepareValue(defaultValue || value));

    const [isRequired, setRequiredState]  = React.useState<boolean>(Boolean(required));

    const [error, setError] = React.useState('');

    const inputRef = React.useRef({
        id: Math.random(),
        input: null,
        validate: () => {
            validateInput({
                target: inputRef.current.input,
            });
        }
    });

    React.useEffect(() => {
        if (value === undefined) return;

        setValue(prepareValue(value));
    }, [value]);

    const formInput = useFormInput({
        name,
        value: internalValue,
        required: isRequired,
        setError,
        validate() {
            validateInput({
                target: inputRef.current.input,
            });
        }
    }, [internalValue]);

    React.useEffect(() => {
        setRequiredState(required);
    }, [required]);

    /**
     * Validate the input
     */
    const validateInput = e => {
        if (!e.target) return;

        let input = e.target,
            value = input.value;

        // reset validation input error
        let inputValidation = null;

        if (!Is.empty(rules)) {
            for (let inputRule of rules) {
                // Get rule options list
                // requiresValue: requires value before evaluating the rule
                // type: requires a certain type before evaluating the rule
                // evaluate: the  rule evaluation function 
                const { requiresValue = true, type, rule, evaluate } = inputRule;

                //  if the requires value is set to true and there is no value
                // then skip the rule
                if (requiresValue && !value) continue;

                // If the rule requires certain input type and 
                // the input type is not the same, then skip the rule
                if (type && type !== input.type) continue;

                // if the rule is not listed in the input props, then skip the rule evaluation
                if (rule && props[rule] === undefined) continue;

                // Finally, evaluate the input against the rule

                const { hasError, errorMessage } = evaluate(value, props, e);

                if (hasError) {
                    inputValidation = errorMessage;
                    break; // stop the rest of the rules evaluation
                }
            }
        }

        setValue(value);

        if (inputValidation) {
            formInput.markAsInvalid(inputValidation);
        } else {
            formInput.markAsClean();
        }

        if (onInput) {
            onInput(e);
        }
    };


    const inputProps = baseInputProps || {};

    if (inputProps.readOnly === undefined) {
        inputProps.readOnly = readOnly;
    }

    if (inputProps.startAdornment === undefined && icon) {
        inputProps.startAdornment = (
            <InputAdornment position={iconPosition}>{icon}</InputAdornment>
        );
    }

    let label = trans(props.label || props.placeholder);

    if (label) {
        delete otherProps.label;
    }

    if (otherProps.placeholder) {
        otherProps.placeholder = trans(props.placeholder);
    }

    if (name) {
        otherProps['name'] = toInputName(name);
    }

    return (
        <TextField
            error={Boolean(error)}
            label={<Label label={label} required={isRequired} />}
            margin={props.margin || 'normal'}
            inputRef={input => inputRef.current.input = input}
            onInput={validateInput}
            helperText={error}
            variant={variant}
            fullWidth
            InputProps={inputProps}
            {...otherProps}
            value={internalValue}
        />
    );
}
FormInput.defaultProps = {
    type: 'text',
};