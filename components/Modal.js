import React from 'react';
import Is from '@flk/supportive-is';
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import Dialog from '@material-ui/core/Dialog';
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
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));
function DefaultModalTitle(props) {
    const classes = useStyles();
    return (React.createElement(DialogTitle, { disableTypography: true, className: classes.modalTitle },
        React.createElement(Typography, { variant: "h6" }, props.title),
        props.onClose ? (React.createElement(IconButton, { "aria-label": "close", className: classes.modalTitleCloseBtn, onClick: props.onClose },
            React.createElement(CloseIcon, null))) : null));
}
function Modal(props) {
    const { size, esc, plain, title, open, onClose, onSubmit, backdrop, children: content, ...otherDialogProps } = props;
    const [opened, openModal] = React.useState(open);
    const close = () => {
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
        modalTitle = React.createElement(DefaultModalTitle, { title: title, onClose: close });
    }
    const children = Is.function(content) ? content({
        close,
    }) : content;
    const modalContent = plain === false ?
        React.createElement(DialogContent, { dividers: true, children: children }) :
        children; // if plain true, display children directly
    return (React.createElement(Dialog, Object.assign({ fullWidth: true, disableBackdropClick: !backdrop, disableEscapeKeyDown: !esc, maxWidth: size, TransitionComponent: Grow, onClose: close, open: opened }, otherDialogProps),
        modalTitle,
        modalContent));
}
Modal.propTypes = {
    plain: PropTypes.bool,
    esc: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    backdrop: PropTypes.bool.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};
Modal.defaultProps = {
    size: 'sm',
    plain: false,
    esc: false,
    backdrop: false,
    fullScreen: false,
};

export default Modal;
