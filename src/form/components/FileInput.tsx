import React from 'react';
import Label from './Label';
import Is from '@flk/supportive-is';
import { PrimaryButton } from './StaticButton';
import { HiddenInputFile } from './FormHelpers';
import useFormInput from '../hooks/useFormInput';
import { toInputName, Random } from 'reinforcements';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { FormControl, FormHelperText } from '@material-ui/core';

import {
    FileInputWrapper,
    FileButtonWrapper,
    FileButtonText
} from './FileInputHelperComponents';
import { For, If } from '../../components';
import HiddenInput from './HiddenInput';

export type FileInputProps = {
    label?: React.ReactNode;
    required?: boolean;
    accept?: string[];
    stringableValue?: boolean;
    name?: string;
    onChange?: Function;
    value?: string | false; // this is important for required validation
    buttonText?: React.ReactNode;
    buttonIcon?: React.ReactNode;
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
    const {onError = null, label, value, required, accept, onChange, stringableValue = true, buttonText, buttonIcon, id = Random.id(), name, ...otherProps } = props;

    const [currentButtonText, setButtonText] = React.useState(buttonText);
    const [error, setError] = React.useState(null);
    const [originalValue] = React.useState(value);
    const [files, setFiles] = React.useState<FileList | string | false>(null);

    const fileInputRef: any = React.useRef();
    const hasError = Boolean(error);

    const formInput = useFormInput({
        name,
        value: value || files,
        setError,
        onError,
        required,
    }, [files]);

    React.useEffect(() => {
        if (value === false) {
            fileInputRef.current.type = 'text';
            // fileInputRef.current.type = 'file';
            fileInputRef.current.value = '';
        }

        setFiles(value);
    }, [value]);

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

        setButtonText(selectedFileName);

        setFiles(e.target.files);

        formInput.requiredValue(e.target.files);
    }

    const handleName = () => {
        if (name.includes('[') === false) {
            return Is.array(originalValue) ? name + 'String[]' : name;
        }

        const [nameOnly, ...restOfName] = name.split('[');

        return nameOnly + 'String[' + restOfName.join('[');
    }

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
                    <otherProps.buttonComponent id={id} onClick={openFileSelectionDialog}>
                        {buttonIcon}
                        <FileButtonText>{currentButtonText}</FileButtonText>
                    </otherProps.buttonComponent>
                </FileButtonWrapper>

                <FormHelperText error={hasError}>{error}</FormHelperText>

                <HiddenInputFile accept={(accept || []).map(extension => '.' + extension).join(',')} onChange={onFileSelection} ref={fileInputRef} style={{ display: 'none' }} name={toInputName(name)} />
            </FormControl>
        </FileInputWrapper>
    )
}

FileInput.defaultProps = {
    onChange: () => { },
    buttonComponent: PrimaryButton,
    buttonIcon: <CloudUploadIcon />,
    buttonText: 'Please Select File',
};