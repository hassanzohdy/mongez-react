import 'reinforcements';
import React from 'react';
import '../localization/locales.js';
import { trans } from '../localization/translator.js';
import pressed, { ENTER_KEY } from '../utils/events.js';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import FormInput from '../form/components/FormInput.js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

function Confirm(props) {
    const { title, message, closeText, confirmText, onClose, onConfirm, withInput, input: Input, InputProps = {}, ...dialogProps } = props;
    const [inputValue, updateValue] = React.useState('');
    const handleConfirm = () => {
        onConfirm(inputValue);
        onClose();
        updateValue('');
    };
    const setInputValue = e => {
        updateValue(e.target.value);
    };
    let confirmAutoFocus = true;
    if (withInput) {
        if (InputProps.autoFocus === undefined) {
            InputProps.autoFocus = true;
            confirmAutoFocus = false;
        }
    }
    if (InputProps) {
        InputProps.onKeyDown = e => {
            if (pressed(e, ENTER_KEY)) {
                handleConfirm();
            }
        };
    }
    return (React.createElement(Dialog, Object.assign({ onClose: onClose }, dialogProps),
        React.createElement(DialogTitle, null, title),
        React.createElement(DialogContent, null,
            React.createElement(DialogContentText, { component: "div" },
                message,
                withInput && React.createElement(Input, Object.assign({}, InputProps, { value: inputValue, onChange: setInputValue })))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onClose, color: "primary" }, closeText),
            React.createElement(Button, { onClick: handleConfirm, color: "primary", autoFocus: confirmAutoFocus }, confirmText))));
}
Confirm.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    confirmText: PropTypes.string.isRequired,
    closeText: PropTypes.string.isRequired,
};
Confirm.defaultProps = {
    title: trans('areYouSure'),
    confirmText: trans('confirm'),
    closeText: trans('cancel'),
    withInput: false,
    input: FormInput
};

export default Confirm;
