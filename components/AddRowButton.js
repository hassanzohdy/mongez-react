import React from 'react';
import '../localization/locales.js';
import { trans } from '../localization/translator.js';
import { IconButton } from '@material-ui/core';
import Tooltip from './Tooltip.js';
import ColoredIcon from './ColoredIcon.js';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function AddRowButton({ color = "primary", addAt = 'end', items, newItem, setItems }) {
    const addItem = () => {
        if (addAt === 'end') {
            setItems([...items, newItem()]);
        }
        else if (addAt === 'start') {
            setItems([newItem(), ...items]);
        }
    };
    return (React.createElement(IconButton, { onClick: () => addItem() },
        React.createElement(Tooltip, { title: trans('add') },
            React.createElement(ColoredIcon, { icon: AddCircleIcon, color: color }))));
}

export default AddRowButton;
