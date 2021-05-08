import React from 'react';
import Form from './Form';
import PropTypes from 'prop-types';
import { Modal } from './../../components';
import FormModalTitle from './FormModalTitle';
import DialogContent from '@material-ui/core/DialogContent';

export default function FormModal(props) {
    const { title, onSubmit, ...otherDialogProps } = props;
    return (
        <Modal plain {...otherDialogProps}>
            {modal => {
                return (
                    <Form onSubmit={onSubmit}>
                        <FormModalTitle onClose={modal.close} title={title} />
                        <DialogContent>
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