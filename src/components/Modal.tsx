import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Is from '@flk/supportive-is';
import Grow from '@material-ui/core/Grow';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
    modalTitle: {
        margin: 0,
        padding: theme.spacing(2),
    },
    modalTitleCloseBtn: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

function DefaultModalTitle(props) {
    const classes: any = useStyles();

    return (
        <DialogTitle disableTypography className={clsx(classes.modalTitle, props.classes.modalTitle)}>
            <Typography variant="h6">{props.title}</Typography>
            {props.onClose ? (
                <IconButton
                    aria-label="close"
                    className={clsx(classes.modalTitleCloseBtn, props.classes.modalTitleCloseBtn)}
                    onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

export default function Modal(props) {
    const {
        size, esc,
        plain,
        title, open, onClose,
        classes = {},
        backdrop, children: content, ...otherDialogProps } =
        props;

    const [opened, openModal] = React.useState(open);

    const close = (reason) => {
        openModal(false);
        setTimeout(onClose, 100);
    };

    React.useEffect(() => {
        openModal(open);
    }, [open]);

    // default is passing title as a component
    let modalTitle = title;

    // otherwise, we will render the default modal title component
    if (Is.string(modalTitle)) {
        modalTitle = <DefaultModalTitle classes={classes} title={title} onClose={close} />
    }

    const children = Is.function(content) ? content({
        close,
    }) : content;

    const modalContent = plain === false ?
        <DialogContent dividers children={children} /> :
        children; // if plain true, display children directly

    return (
        <Dialog
            fullWidth
            // disableBackdropClick={!backdrop}
            disableEscapeKeyDown={!esc}
            maxWidth={size}
            TransitionComponent={Grow}
            onClose={close}
            open={opened}
            {...otherDialogProps}
        >
            {modalTitle}
            {modalContent}
        </Dialog>
    );
}

Modal.propTypes = {
    plain: PropTypes.bool,
    classes: PropTypes.object,
    esc: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,// same attribute name in the modal
    size: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    backdrop: PropTypes.bool.isRequired,
    fullScreen: PropTypes.bool.isRequired, // same attribute name in the modal
};

Modal.defaultProps = {
    size: 'sm',
    plain: false, // if set to true, then the modal dialog content will not be used
    esc: false, // if set to false, then the esc button will not close the modal    
    backdrop: false, // if set to false, then the backdrop click will not close the modal
    fullScreen: false,
};