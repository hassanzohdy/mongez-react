import React from 'react';
import '../localization/locales.js';
import { trans } from '../localization/translator.js';
import { IconButton } from '@material-ui/core';
import FormContext from '../form/Context/FormContext.js';
import Tooltip from './Tooltip.js';
import ColoredIcon from './ColoredIcon.js';
import DeleteIcon from '@material-ui/icons/Delete';

function DeleteRowButton({ marginTop = '1rem', tooltip = 'delete', icon: Icon = DeleteIcon, iconColor = "#F00", open, index, items, setItems }) {
    const { form } = React.useContext(FormContext);
    if (open === false)
        return null;
    const onClick = () => {
        items.splice(index, 1);
        if (form) {
            form.validForm(true);
        }
        setItems([...items]);
    };
    return (React.createElement(Tooltip, { title: trans(tooltip) },
        React.createElement(IconButton, { style: { marginTop }, onClick: onClick },
            React.createElement(ColoredIcon, { icon: Icon, color: iconColor }))));
}

export default DeleteRowButton;
