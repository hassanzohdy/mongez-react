import { toInputName } from 'reinforcements';
import React from 'react';
import '../../localization/locales.js';
import { trans } from '../../localization/translator.js';
import { FormHelperText, styled, FormControl } from '@material-ui/core';
import Label from './Label.js';
import useRequiredInputValidator from '../hooks/use-required-input-validator.js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// When the editor is empty, it returns the following html text
// in that case we'll compare the value with the following constant
// If it equals it, then we'll consider the value is empty
// const emptyValueString = '<p><br></p>';
const InputWrapper = styled(FormControl)(({ theme }) => ({
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
}));
const InputLabel = styled(Label)(({ theme }) => ({
    marginBottom: theme.spacing(1.5),
}));
function RichTextInput(props) {
    let { required, name, defaultValue, style = { height: '200px', direction: 'rtl' }, placeholder, value, onChange, label, ...otherProps } = props;
    const contentBlock = htmlToDraft(defaultValue || value || '');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const [editorState, setEditorState] = React.useState(EditorState.createWithContent(contentState));
    const [inputValue, setValue] = React.useState(() => {
        if (defaultValue || value)
            return defaultValue || value;
        return null;
    });
    const onContentStateChange = contentState => {
        const value = draftToHtml(contentState);
        setValue(value);
        if (onChange) {
            onChange(value);
        }
        if (!value) {
            setError(trans('validation.required'));
        }
        else {
            clearRequiredValidation();
        }
    };
    const [error, setError] = React.useState(null);
    const hasError = Boolean(error);
    const componentRef = React.useRef();
    const clearRequiredValidation = useRequiredInputValidator(required, componentRef, inputValue, setError);
    if (placeholder) {
        placeholder = trans(placeholder);
    }
    return (React.createElement(InputWrapper, { error: hasError, fullWidth: true },
        React.createElement(InputLabel, { label: trans(label), required: required }),
        React.createElement(Editor, { onContentStateChange: onContentStateChange, editorState: editorState, textAlignment: "right", onEditorStateChange: setEditorState }),
        React.createElement(FormHelperText, { error: hasError }, error),
        name &&
            React.createElement("input", { type: "hidden", name: toInputName(name), value: inputValue })));
}

export default RichTextInput;
