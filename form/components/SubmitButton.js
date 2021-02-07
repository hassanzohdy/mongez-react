import React from 'react';
import Button from '@material-ui/core/Button';
import FormContext from '../Context/FormContext.js';
import CircularProgress from '@material-ui/core/CircularProgress';

function SubmitButton(props) {
    const { form } = React.useContext(FormContext);
    const { children, ...buttonProps } = props;
    const buttonContent = form.isSubmitting ? React.createElement(CircularProgress, { size: "1rem", style: { color: '#FFF' } }) : children;
    return (React.createElement(Button, Object.assign({ type: "submit", disabled: form.isValidForm === false || form.isSubmitting }, buttonProps), buttonContent));
}

export default SubmitButton;
