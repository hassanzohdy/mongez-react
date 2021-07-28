import clsx from 'clsx';
import React from 'react';
import Label from './Label';
import Is from '@flk/supportive-is';
import config from './../../config';
import rulesList from '../utils/rules-list';
import { trans } from './../../localization';
import useFormInput from '../hooks/useFormInput';
import { usePropDetector } from '../../hooks';
import { Random, toInputName } from 'reinforcements';
import { InputRule } from '../validation/rules/input-rule';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Box, createStyles, fade, FormControl, InputAdornment, InputBase, InputLabel, makeStyles, OutlinedInputProps, Theme, withStyles } from '@material-ui/core';

export type InputProps = {
    /**
     * Input label
     */
    label?: string;
    /**
     * Determine if the input is read only
     */
    readOnly?: boolean;
    /**
     * Input validation rules list
     */
    rules?: InputRule[];
    /**
     * Input id attribute
     */
    id?: string;
    /**
     * Input name attribute
     */
    name?: string;
    /**
     * Input icon attribute
     */
    icon?: React.ReactNode;
    /**
     * When set to true, the component will interact as controlled/uncontrolled component, otherwise it will be interact as uncontrolled  
     * 
     * @defaults true
     */
    strict?: boolean;
    /**
     * Current themes for the form input
     * 
     * @defaults material
     */
    theme?: 'material' | 'bootstrap' | 'redit';
    /**
     * Icon position, works only with when icon prop is passed
     */
    iconPosition?: 'start' | 'end';
    /**
     * List of available classes
     */
    classes?: {
        /**
         * Error message class
         */
        errorMessage?: string;
        /**
         * Input class
         */
        input?: string;
        /**
         * Label class
         */
        label?: string;
        /**
         * Form Control class
         */
        formControl?: string;
    },
    /**
     * A callback function triggered on validation error
     */
    onError?: (errorType: string, errorMessage: string) => void;
} & TextFieldProps;

const useStyle = makeStyles((theme) => ({
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    error: {
        color: '#F00',
        fontSize: '0.75rem',
        fontWeight: 400,
        marginTop: theme.spacing(0.8),
        textAlign: 'left',
    }
}));

function Error({ error, classes }) {
    const internalClasses = useStyle();

    const className = React.useMemo(() => clsx(
        internalClasses.error,
        classes && classes.errorMessage,
        config.get('form.input.classes.errorMessage')
    ), [classes, internalClasses]);

    if (!error) return null;

    return <div className={className}>{error}</div>
}

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.common.white,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:focus': {
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }),
)(InputBase);

const useStylesReddit = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: '#fcfcfb',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#fff',
            },
            '&$focused': {
                backgroundColor: '#fff',
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
                borderColor: theme.palette.primary.main,
            },
        },
        focused: {},
    }),
);

function RedditTextField(props: TextFieldProps) {
    const classes = useStylesReddit();

    return (
        <TextField
            InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
            {...props}
        />
    );
}

function Input(props: InputProps, ref) {
    const { onError = null, strict = config.get('form.input.strict', true), defaultValue = '', theme = config.get('form.input.theme'), icon, id = Random.id(), iconPosition = 'start', InputProps: baseInputProps, rules = config.get('form.input.rulesList', rulesList), value, readOnly, required, variant = config.get('form.input.variant', 'outlined'), onInput, name, ...otherProps } = props;
    const [isControlledComponent] = React.useState(!Is.undefined(props.value));

    const [internalValue, setValue] = React.useState(
        (isControlledComponent ? value : defaultValue) || ''
    );

    const [isRequired, setRequiredState] = React.useState<boolean>(Boolean(required));

    const [error, setError] = React.useState('');

    const classes = useStyle();

    const inputRef = React.useRef({
        id: Math.random(),
        input: null,
        validate: () => {
            validateInput({
                target: inputRef.current.input,
            });
        }
    });

    usePropDetector(setValue, value);

    const formInput = useFormInput({
        name,
        value: internalValue,
        required: isRequired,
        setError,
        onError,
        validate() {
            validateInput({
                target: inputRef.current.input,
            });
        }
    }, [internalValue]);

    usePropDetector(setRequiredState, required);

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
                if (rule && props[rule] === undefined && type !== input.type) continue;

                // Finally, evaluate the input against the rule

                const { errorType, hasError, errorMessage } = evaluate(value, props, e);

                if (hasError) {
                    inputValidation = { errorMessage, errorType };
                    break; // stop the rest of the rules evaluation
                }
            }
        }

        if (strict === false) {
            setValue(value);
        }

        if (inputValidation) {
            formInput.markAsInvalid(inputValidation.errorType, inputValidation.errorMessage);
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

    let label = trans(config.get('form.input.interchangeableLabelPlaceholder') === true ? (props.label || props.placeholder) : props.label);

    if (label) {
        delete otherProps.label;
    }

    if (otherProps.placeholder) {
        otherProps.placeholder = trans(props.placeholder);
    }

    if (name) {
        otherProps['name'] = toInputName(name);
    }

    otherProps['id'] = id;

    const setInputRef = input => {
        inputRef.current.input = input;
        if (ref) {
            ref.current = input;
        }
    };

    if (theme === 'bootstrap') {
        const input = <BootstrapInput
            value={internalValue}
            placeholder={otherProps.placeholder}
            name={otherProps['name']}
            readOnly={otherProps['readOnly']}
            fullWidth
            inputRef={setInputRef}
            onInput={validateInput}
            // InputProps={inputProps}
            {...otherProps as any}
        />;

        return (
            <FormControl fullWidth className={clsx(classes.margin, otherProps?.classes?.formControl)}>
                <InputLabel shrink htmlFor={otherProps['id']}>
                    {label}
                </InputLabel>

                {icon === undefined && input}
                {icon !== undefined &&
                    <Box display="flex" mr={4} mt={3}>
                        <Box flexGrow={1}>{input}</Box>
                        <Box mt={1.5} ml={-7.5} zIndex={1000} width={30}>{icon}</Box>
                    </Box>
                }

                <Error classes={props.classes} error={error} />
            </FormControl>
        )
    }

    if (theme === 'redit') {
        return (
            <RedditTextField
                error={Boolean(error)}
                label={<Label label={label} required={isRequired} />}
                margin={props.margin || 'normal'}
                inputRef={setInputRef}
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

    return (
        <TextField
            error={Boolean(error)}
            label={<Label label={label} required={isRequired} />}
            margin={props.margin || 'normal'}
            inputRef={setInputRef}
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

const FormInput = React.forwardRef(Input);

FormInput.defaultProps = {
    type: 'text',
};

export default FormInput;