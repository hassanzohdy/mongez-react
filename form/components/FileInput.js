import { Random, toInputName } from 'reinforcements';
import React from 'react';
import Is from '@flk/supportive-is';
import { FormControl, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import { HiddenInputFile } from './FormHelpers.js';
import Label from './Label.js';
import useRequiredInputValidator from '../hooks/use-required-input-validator.js';
import { PrimaryButton } from './StaticButton.js';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { FileInputWrapper, FileButtonWrapper, FileButtonText } from './FileInputHelperComponents.js';

function FileInput(props) {
    let { label, required, accept, onChange, buttonText, buttonIcon, id = Random.id(), name, ...otherProps } = props;
    const [currentButtonText, setButtonText] = React.useState(buttonText);
    const [error, setError] = React.useState(null);
    const [files, setFiles] = React.useState(otherProps.value);
    const fileInputRef = React.useRef();
    const componentRef = React.useRef();
    const clearRequiredInput = useRequiredInputValidator(required, componentRef, files, setError);
    if (Is.array(accept)) {
        accept = accept.map(extension => '.' + extension).join(',');
    }
    const hasError = Boolean(error);
    const openFileSelectionDialog = e => {
        fileInputRef.current.click();
    };
    const onFileSelection = e => {
        // is the files is empty, it means client has clicked on the cancel button
        if (Is.empty(e.target.files))
            return;
        const selectedFileName = e.target.files[0].name;
        onChange(e);
        setButtonText(selectedFileName);
        setFiles(Array.from(e.target.files));
        clearRequiredInput();
    };
    return (React.createElement(FileInputWrapper, null,
        React.createElement(FormControl, { error: hasError },
            React.createElement(Label, { label: label, htmlFor: id, required: required }),
            React.createElement(FileButtonWrapper, null,
                React.createElement(otherProps.buttonComponent, { id: id, onClick: openFileSelectionDialog },
                    buttonIcon,
                    React.createElement(FileButtonText, null, currentButtonText))),
            React.createElement(FormHelperText, { error: hasError }, error),
            React.createElement(HiddenInputFile, { accept: accept, onChange: onFileSelection, ref: fileInputRef, style: { display: 'none' }, name: toInputName(name) }))));
}
FileInput.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    buttonIcon: PropTypes.node,
    buttonText: PropTypes.node,
    buttonComponent: PropTypes.any,
};
FileInput.defaultProps = {
    onChange: () => { },
    buttonComponent: PrimaryButton,
    buttonIcon: React.createElement(CloudUploadIcon, null),
    buttonText: 'Please Select File',
};

export default FileInput;
