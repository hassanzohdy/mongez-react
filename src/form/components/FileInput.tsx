import React from 'react';
import Label from './Label';
import Is from '@flk/supportive-is';
import HiddenInput from './HiddenInput';
import { InputRule } from '../utils/types';
import { For, If } from '../../components';
import { PrimaryButton } from './StaticButton';
import { HiddenInputFile } from './FormHelpers';
import { useFormInputRegistrar } from '../hooks';
import FormContext from '../Context/FormContext';
import { validateComponent } from '../utils/validator';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { FormControl, FormHelperText } from '@material-ui/core';
import { useError, useFileRules, useId, useLabel, useName } from '../hooks/useFormInputProps';
import {
    FileInputWrapper,
    FileButtonWrapper,
    FileButtonText
} from './FileInputHelperComponents';
import { trans } from '../../localization';

export type FileInputProps = {
    label?: React.ReactNode;
    required?: boolean;
    accept?: string[];
    acceptImage?: boolean;
    stringableValue?: boolean;
    /**
     * Input name
     */
    name?: string;
    multiple?: boolean;
    rules?: InputRule[];
    onChange?: Function;
    content?: React.ReactNode;
    value?: string | false; // this is important for required validation
    buttonText?: React.ReactNode;
    buttonIcon?: React.ReactNode;
    buttonComponent?: React.ComponentType<any>;
    id?: string;
    [key: string]: any;
    /**
     * A callback function triggered on validation error
     */
    onError?: (errorType: string, errorMessage: string) => void;
};

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

export default function FileInput(props: FileInputProps) {
    const {
        required, accept, multiple = false, acceptImage, onChange,
        content,
        stringableValue = true, buttonText, buttonIcon
    } = props;

    // Contexts List
    const { form } = React.useContext(FormContext);

    // States list
    const id = useId(props);
    const name = useName(props);
    const label = useLabel(props);
    const rules = useFileRules(props);
    const [error, setError, hasError] = useError(props);
    const [currentButtonText, setButtonText] = React.useState(buttonText);
    const [originalValue] = React.useState(props.value || props.defaultValue);
    const [files, setFiles] = React.useState<FileList | string | false>(null);

    const fileInputRef: any = React.useRef();

    const [dynamicContent, setDynamicContent] = React.useState<React.ReactNode>(content);

    const acceptedTypes = React.useState(() => {
        if (accept) return (accept || []).map(extension => '.' + extension).join(',');

        if (acceptImage === true) return 'image/*';

        return null;
    });

    React.useEffect(() => {
        if (props.value === false) {
            fileInputRef.current.type = 'text';
            // fileInputRef.current.type = 'file';
            fileInputRef.current.value = '';
        }

        setFiles(props.value);
    }, [props.value]);

    const openFileSelectionDialog = () => {
        fileInputRef.current.click();
    }

    const onFileSelection = (e: HTMLInputEvent) => {
        // is the files is empty, it means client has clicked on the cancel button

        if (Is.empty(e.target.files)) {
            return;
        }

        const selectedFileName = e.target.files[0].name;

        onChange(e);

        setButtonText(multiple ? trans('form.input.selectedFiles', e.target.files.length) : selectedFileName);

        setFiles(e.target.files);

        validateComponent({
            form,
            id,
            rules,
            value: (e.target.files as any),
            props,
            setError,
        });
    }

    React.useEffect(() => {
        if (content === null || content === undefined) return;

        setDynamicContent(content);
    }, [content]);

    useFormInputRegistrar({
        id,
        name,
        rules,
        props,
        value: files,
        setError,
    });

    const handleName = () => {
        if (name.includes('[') === false) {
            return Is.array(originalValue) ? name + 'String[]' : name;
        }

        const [nameOnly, ...restOfName] = name.split('[');

        return nameOnly + 'String[' + restOfName.join('[');
    }

    const Component = props.buttonComponent;

    return (
        <FileInputWrapper>
            {/* <If condition={required !== true && !Is.empty(originalValue) && originalValue === files && stringableValue}> */}
            <If condition={!Is.empty(originalValue) && originalValue === files && stringableValue}>
                <If condition={Is.array(originalValue)}>
                    <For array={originalValue} render={value => (
                        <HiddenInput name={handleName()} value={originalValue as string} />
                    )} />
                </If>
                <If condition={!Is.array(originalValue)}>
                    <HiddenInput name={handleName()} value={originalValue as string} />
                </If>
            </If>
            <FormControl error={hasError}>
                <Label label={label} htmlFor={id} required={required} />

                <FileButtonWrapper>
                    <Component id={id} onClick={openFileSelectionDialog}>
                        {dynamicContent ? dynamicContent :
                            <>
                                {buttonIcon}
                                <FileButtonText> {currentButtonText}</FileButtonText>
                            </>
                        }
                    </Component>
                </FileButtonWrapper>

                <FormHelperText error={hasError}>{error}</FormHelperText>

                <HiddenInputFile multiple={multiple} accept={acceptedTypes} onChange={onFileSelection} ref={fileInputRef} style={{ display: 'none' }} name={name} />
            </FormControl>
        </FileInputWrapper >
    )
}

FileInput.defaultProps = {
    onChange: () => { },
    buttonComponent: PrimaryButton,
    buttonIcon: <CloudUploadIcon />,
    buttonText: 'Please Select File',
};