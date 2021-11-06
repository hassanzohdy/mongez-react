import React from 'react';
import Form from './Form';
import PropTypes from 'prop-types';
import { Modal } from './../../components';
import { trans } from '../../localization';
import FormModalTitle from './FormModalTitle';
import { makeStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles({
    content: {
        overflowY: 'inherit',
    }
});

export default function FormModal(props) {
    const { title, onSubmit, saveButtonText = trans('save'), ...otherDialogProps } = props;
    const classes = useStyles();
    return (
        <Modal plain {...otherDialogProps}>
            {modal => {
                return (
                    <Form onSubmit={onSubmit}>
                        <FormModalTitle onClose={modal.close} saveButtonText={saveButtonText} title={title} />
                        <DialogContent classes={{ root: classes.content }}>
                            {props.children}
                        </DialogContent>
                    </Form>
                );
            }}
        </Modal>
    );
}

FormModal.propTypes = {
    esc: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,// same attribute name in the modal
    size: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    backdrop: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired, // same attribute name in the modal
};

FormModal.defaultProps = {
    size: 'sm',
    esc: false, // if set to false, then the esc button will not close the modal    
    backdrop: false, // if set to false, then the backdrop click will not close the modal
    fullScreen: false,
};