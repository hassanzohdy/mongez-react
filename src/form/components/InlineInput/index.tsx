import clsx from 'clsx'
import style from './index.module.scss';
import React from 'react'
import { Box } from '@material-ui/core';
import TextAreaInput from './../TextAreaInput';
import HiddenInput from './../HiddenInput';
import MarkdownInput from './../MarkdownInput';
import FormInput from './../FormInput';
import Label from './../Label';
import { useInputValue } from '../../hooks';
import { useBooleanStateObj } from '../../../hooks';
import { trans } from '../../../localization';
import Markdown from '../../../components/Markdown';

const textBoxTypes = {
    textarea: TextAreaInput,
    markdown: MarkdownInput,
    text: FormInput,
}

export type InlineInputProps = {
    /**
     * Input type
     */
    type?: string;
    /**
     * Renderer props
     */
    rendererProps?: (content: string) => object;
    /**
     * Set the component directly instead of using type
     */
    Component?: React.ComponentType;
    /**
     * Determine wether the input will be auto focused
     */
    autoFocus?: boolean;
    /**
     * Input label
     */
    label: React.ReactNode;
    /**
     * Input name
     */
    name?: string;
    /**
     * Default value
     */
    defaultValue?: string;
    /**
     * Determine whether the input is required
     * 
     * @default false
     */
    required?: boolean;
    /**
     * Display value instead of label
     * 
     * @default false
     */
    displayValue?: boolean;
    /**
     * Display label when input is visible
     * 
     * @default false
     */
    displayLabel?: false;
}

function DisplayValue({ displayed, value, rendererProps, toggleDisplay, label, type, props }) {
    if (type === 'markdown') {
        rendererProps = (rendererProps || (value => {
            return {}
        }))(value);

        return (
            <>
                <Label className={clsx(style.visibleBox)} label={label} onClick={toggleDisplay} title={trans(label as string)} />
                {/* <ReactMarkdown>{value}</ReactMarkdown> */}
                <Markdown children={value} {...rendererProps} />
            </>
        )
    }
    return (
        <Label className={clsx(style.visibleBox, {
            active: displayed,
        })} label={value} onClick={toggleDisplay} title={trans(label as string)} />
    )
}

export default function InlineInput({required = false, rendererProps = null, displayLabel = false, displayValue = false, Component = null, type = null, autoFocus = false, label, name = null, defaultValue = null, ...props }: InlineInputProps) {
    const [value, setInternalValue] = useInputValue(defaultValue);

    const { isTrue: displayed, isFalse: hidden, setFalse: hide, toggle: toggleDisplay } = useBooleanStateObj(autoFocus);

    const BaseComponent = type ? textBoxTypes[type] : Component;

    return (
        <>
            {hidden &&
                <>
                    {name &&
                        <HiddenInput name={name} value={value} />
                    }
                    {(displayValue === false || displayValue === true && !value) &&
                        <Label required={required} className={clsx(style.visibleBox, {
                            active: displayed,
                        })} label={label} onClick={toggleDisplay} />
                    }
                    {displayValue === true && value &&
                        <DisplayValue rendererProps={rendererProps} props={props} displayed={displayed} value={value} toggleDisplay={toggleDisplay} label={label} type={type} />
                    }
                </>
            }

            {displayed &&
                <Box>
                    <BaseComponent label={displayLabel ? label : null as any} onBlur={hide} autoFocus name={name} onChange={setInternalValue} defaultValue={value} labelPosition="top" rows={4} {...props} />
                </Box>
            }
        </>
    )
}
