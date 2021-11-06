import React from "react";
import config from "../../config";
import rulesList from "./../utils/rules-list";
import FormContext from "../Context/FormContext";
import { getFormInputTheme } from "./../utils/flags";
import { validateComponent } from "../utils/validator";
import useFormInputRegistrar from "./useFormInputRegistrar";
import { FormInput2HookProps, FormInput2Props } from "../utils/types/FormInput";
import { useError, useId, useLabel, useName, usePlaceholder, useValue } from "./useFormInputProps";

export default function useFormInput2(props: FormInput2Props): FormInput2HookProps {
    // Contexts List
    const { form } = React.useContext(FormContext);

    // States List

    const id = useId(props);
    const name = useName(props);
    const label = useLabel(props);
    const placeholder = usePlaceholder(props);
    const [value, setValue] = useValue(props);
    const [error, setError, hasError] = useError(props);
    const [theme] = React.useState(() => props.theme || getFormInputTheme());
    const [rules] = React.useState(() => props.rules || config.get('form.input.rulesList', rulesList));
    const [labelPosition] = React.useState(() => props.labelPosition || config.get('form.input.labelPosition', 'inline'));

    /**
     * Validate the input
     */
    const inputValidator = e => {
        if (!e || !e.target) return;

        let input = e.target,
            value = input.value;

        setValue(value);

        validateComponent({
            form,
            id,
            rules,
            value,
            props,
            setError,
        });
    };

    useFormInputRegistrar({
        id,
        name,
        rules,
        props,
        value,
        setError,
    });

    const otherProps = { ...props };

    const onComponentChange = (e, setAs = e => e.target.value) => {
        if (props.onChange && props.value !== undefined) {
            props.onChange(e, inputValidator);
            return;
        }

        inputValidator(e);

        if (props.onChange) {
            props.onChange(e, inputValidator);
        }

        if (typeof setAs !== 'function') {
            setAs = e => e.target.value;
        }

        setValue(setAs(e));
    };

    React.useEffect(() => {
        if (props.value === undefined || value === props.value) return;

        setValue(props.value || '');

        inputValidator({
            target: {
                value: props.value || '',
            }
        })
    }, [props.value]);

    for (let prop of ['readOnly', 'classes', 'name', 'id', 'label', 'rules', 'value', 'labelPosition', 'placeholder', 'icon', 'iconPosition', 'required', 'onChange', 'theme', 'defaultValue']) {
        delete otherProps[prop];
    }

    if (process.env.NODE_ENV === 'development') {
        if (props.value !== undefined && !props.onChange) {
            console.error('Controlled Component must have a `onChange` prop, otherwise use `defaultValue` props instead');
        }
    }

    return {
        name,
        id,
        value,
        otherProps,
        label,
        labelPosition,
        readOnly: props.readOnly,
        classes: props.classes || {
            input: null,
            formControl: null,
            label: null,
            errorMessage: null,
        },
        icon: props.icon,
        iconPosition: props.iconPosition || 'start',
        placeholder,
        required: props.required || false,
        error,
        hasError,
        theme,
        onChange: onComponentChange,
        rules,
    };
}
