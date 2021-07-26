import React from 'react';
import Tooltip from './Tooltip';
import ColoredIcon from './ColoredIcon';
import { trans } from './../localization';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FormContext from '../form/Context/FormContext';

export type DeleteRowButtonProps = {
    open: boolean;
    index: number;
    items: any[];
    iconColor?: string;
    icon?: React.ReactNode;
    tooltip?: string;
    marginTop?: string | number;
    setItems: Function;
    onClick?: (index: number) => void;
}

export default function DeleteRowButton({ onClick, marginTop = '1rem', tooltip = 'delete', icon: Icon = DeleteIcon, iconColor = "#F00", open, index, items, setItems }: DeleteRowButtonProps) {
    const { form } = React.useContext(FormContext);

    if (open === false) return null;

    const onButtonClick = () => {
        items.splice(index, 1);

        if (form) {
            form.validForm(true);
        }

        onClick && onClick(index);

        setItems([...items]);
    };

    return (
        <Tooltip title={trans(tooltip)}>
            <IconButton style={{ marginTop }} onClick={onButtonClick}>
                <ColoredIcon icon={Icon} color={iconColor} />
            </IconButton>
        </Tooltip>
    )
}