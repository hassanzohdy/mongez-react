import clsx from 'clsx';
import React from 'react';
import style from './index.module.scss';
import Label from './../../Label';
import InputError from '../../InputError';
import useFormInput2 from '../../../hooks/useFormInput2';
import { Input, TextArea, Ref, Form as SemanticForm } from 'semantic-ui-react';
import { FormInput2Props } from '../../../utils/types/FormInput';
import { If } from '../../../../components';

export default function SemanticInput(props: FormInput2Props) {
    const { id, value, name, label, onChange, labelPosition, icon, iconPosition, placeholder, readOnly, required, classes, error, hasError, otherProps } = useFormInput2(props);

    const Component: any = props.type === 'textarea' ? TextArea : Input;

    const inputRef = React.useRef();

    // when focus, set the cursor at the end of the text not at the start of it
    React.useEffect(() => {
        if (!inputRef.current) return;

        const componentRef = (inputRef.current as any);

        if (!componentRef) return;

        const input = componentRef.inputRef || componentRef.ref;

        if (!input) return;

        try {
            input.current.setSelectionRange(value.length, value.length);
        } catch (e) {
            // ignore the error
        }
    }, []);

    return (
        <>
            <div className={clsx('ui', 'form', style.formControl, classes.formControl)}>
                <SemanticForm.Field>
                    <If condition={label && labelPosition === 'top'}>
                        <If condition={typeof label !== 'object'}>
                            <Label className={clsx(style.label, classes.label)} label={label} htmlFor={id} required={required} />
                        </If>
                        <If condition={typeof label === 'object'}>
                            {label}
                        </If>
                    </If>
                    {hasError && <InputError classes={classes} error={error} />}
                    {/* <Ref innerRef={inputRef}> */}
                    <Component
                        error={Boolean(error)}
                        value={value}
                        ref={inputRef}
                        icon={icon || undefined}
                        iconPosition={icon ? (iconPosition === 'start' ? 'left' : 'right') : undefined}
                        id={id}
                        label={label && (labelPosition !== 'top') ? <label htmlFor={id} className={clsx('ui', 'label', style.inlineLabel)}>{label}</label> : undefined}
                        name={name}
                        className={clsx(classes.input, style.input)}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        onChange={onChange}
                        {...otherProps as any}
                    />
                    {/* </Ref> */}
                </SemanticForm.Field>
            </div>
        </>
    )
}