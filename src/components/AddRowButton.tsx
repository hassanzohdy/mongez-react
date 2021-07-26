import React from 'react';
import Tooltip from './Tooltip';
import ColoredIcon from './ColoredIcon';
import { trans } from './../localization';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export type AddRowButtonProps = {
    color?: string;
    addAt?: string;
    items: any[];
    newItem: Function;
    setItems: Function;
};

export default function AddRowButton({ color = "primary", addAt = 'end', items, newItem, setItems }: AddRowButtonProps) {
    const addItem = () => {
        if (addAt === 'end') {
            setItems([...items, newItem()]);
        } else if (addAt === 'start') {
            setItems([newItem(), ...items]);
        }
    };

    return (
        <IconButton onClick={() => addItem()}>
            <Tooltip title={trans('add')}>
                <ColoredIcon icon={AddCircleIcon} color={color} />
            </Tooltip>
        </IconButton>
    )
}