import React from 'react';
import Button from '@material-ui/core/Button';
import FormContext from './../Context/FormContext';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SubmitButton(props) {
    const { form } = React.useContext(FormContext);

    const { children, ...buttonProps } = props;

    const buttonContent = form.isSubmitting ? <CircularProgress size="1rem" style={{ color: '#FFF' }} /> : children;

    return (
        <Button type="submit" disabled={form.isValidForm === false || form.isSubmitting} {...buttonProps}>
            {buttonContent}
        </Button>
    )
}