import 'reinforcements';
import React from 'react';
import 'sprintf-js';
import '../../localization/locales.js';
import '@flk/supportive-is';
import '@material-ui/core';
import '../../components/Link.js';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import Modal from '../../components/Modal.js';
import 'material-ui-image';
import '../../components/Chart.js';
import '../../components/Avatar.js';
import '../../components/Tabs.js';
import '../Context/FormContext.js';
import '../../components/Confirm.js';
import 'react-timeago';
import '../../components/Tooltip.js';
import '../../components/ScrollTo.js';
import '../../components/Redirect.js';
import '../../components/Accordion.js';
import '../../components/ColoredIcon.js';
import 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import '@material-ui/icons/AddCircle';
import '../../components/Preloaders/Spinner/index.js';
import '../../components/ColoredButton.js';
import '@material-ui/icons/Delete';
import '../../components/LabelledOutline.js';
import '../../components/Condition.js';
import '../../components/Grid/GridItemCheckBoxContainer.js';
import '../../components/Badge.js';
import Form from './Form.js';
import FormModalTitle from './FormModalTitle.js';

function FormModal(props) {
    const { title, onSubmit, ...otherDialogProps } = props;
    return (React.createElement(Modal, Object.assign({ plain: true }, otherDialogProps), modal => {
        return (React.createElement(Form, { onSubmit: onSubmit },
            React.createElement(FormModalTitle, { onClose: modal.close, title: title }),
            React.createElement(DialogContent, null, props.children)));
    }));
}
FormModal.propTypes = {
    esc: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    size: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    backdrop: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};
FormModal.defaultProps = {
    size: 'sm',
    esc: false,
    backdrop: false,
    fullScreen: false,
};

export default FormModal;
