import React from 'react';
import { Button, styled } from '@material-ui/core';

const TransparentButton = styled(Button)({
    border: '0px solid #767676',
    borderRadius: '4px',
    padding: '0px',
    width: '24px',
    minWidth: '24px',
    height: '24px',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
});

export default function ColoredButton({ color }) {
    if (! color) return null;
    return (
        <TransparentButton style={{ background: color }}></TransparentButton>
    )
}