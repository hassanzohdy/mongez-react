import React from 'react';
import PropTypes from 'prop-types';
import { trans } from './../localization';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { pressed, ENTER_KEY } from './../utils';
import FormInput from './../form/components/FormInput';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function Confirm(props) {
  const {
    title, message, closeText, confirmText,
    onClose, onConfirm, withInput, input: Input, InputProps = {}, ...dialogProps
  } = props;

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

  return (
    <Dialog
      onClose={onClose}
      {...dialogProps}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          {message}
          {withInput && <Input {...InputProps} value={inputValue} onChange={setInputValue} />}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {closeText}
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus={confirmAutoFocus}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
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