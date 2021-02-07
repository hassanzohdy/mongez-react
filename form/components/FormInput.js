import { toInputName } from 'reinforcements';
import config from '../../config/index.js';
import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import Is from '@flk/supportive-is';
import PropTypes from 'prop-types';
import Label from './Label.js';
import rulesList from '../utils/rules-list.js';
import FormContext from '../Context/FormContext.js';
import TextField from '@material-ui/core/TextField';

function prepareValue(value) {
    return !Is.empty(value) ? value : '';
}
function FormInput(props) {
    const { rules, value, defaultValue, readOnly, required, onInput, name, ...otherProps } = props;
    const [internalValue, setValue] = React.useState(prepareValue(defaultValue || value));
    const [error, setError] = React.useState('');
    const { form } = React.useContext(FormContext);
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
        form.setInput(inputRef);
    }, []);
    React.useEffect(() => {
        if (value === undefined)
            return;
        setValue(prepareValue(value));
    }, [value]);
    /**
     * Validate the input
     */
    const validateInput = e => {
        if (!e.target)
            return;
        let input = e.target, value = input.value;
        // reset validation input error
        let inputValidation = null;
        if (!Is.empty(rules)) {
            for (let inputRule of rules) {
                // if the inputRule is function
                // then wrap it inside an object with `evaluate` key
                if (Is.function(inputRule)) {
                    inputRule = {
                        evaluate: inputRule,
                    };
                }
                // Get rule options list
                // requiresValue: requires value before evaluating the rule
                // type: requires a certain type before evaluating the rule
                // evaluate: the  rule evaluation function 
                const { requiresValue = true, type, rule, evaluate } = inputRule;
                //  if the requires value is set to true and there is no value
                // then skip the rule
                if (requiresValue && !value)
                    continue;
                // If the rule requires certain input type and 
                // the input type is not the same, then skip the rule
                if (type && type !== input.type)
                    continue;
                // if the rule is not listed in the input props, then skip the rule evaluation
                if (rule && !props[rule])
                    continue;
                // Finally, evaluate the input against the rule
                const { hasError, errorMessage } = evaluate(value, props, e);
                if (hasError) {
                    inputValidation = errorMessage;
                    break; // stop the rest of the rules evaluation
                }
            }
        }
        // tell the form if the input is clean or not
        if (form) {
            if (inputValidation) {
                form.dirtyInput(inputRef);
            }
            else {
                form.cleanInput(inputRef);
            }
        }
        setValue(value);
        setError(inputValidation);
        if (onInput) {
            onInput(e);
        }
    };
    const inputProps = {
        readOnly: readOnly,
    };
    let label = trans(props.label || props.placeholder);
    if (label) {
        delete otherProps.label;
    }
    if (otherProps.placeholder) {
        otherProps.placeholder = trans(props.placeholder);
    }
    if (name) {
        otherProps.name = toInputName(name);
    }
    return (React.createElement(TextField, Object.assign({ error: Boolean(error), label: React.createElement(Label, { label: label, required: required }), margin: props.margin || 'normal', inputRef: input => inputRef.current.input = input, onInput: validateInput, helperText: error, fullWidth: true, InputProps: inputProps }, otherProps, { value: internalValue })));
}
FormInput.propTypes = {
    required: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
};
FormInput.defaultProps = {
    type: 'text',
    color: 'primary',
    variant: config.get('form.input.variant', 'outlined'),
    rules: config.get('form.input.rulesList', rulesList),
};

export default FormInput;
