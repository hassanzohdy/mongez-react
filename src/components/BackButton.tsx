import React from 'react';
import Link from './Link';
import Globals from './../globals';
import { styled, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Button = styled(Link)({
    color: '#000',
    fontSize: '1.7rem',
    fontWeight: 'bold',
    textDecoration: 'none',
});

export default function BackButton({ to, children, ...props }) {
    return (
        <Button to={to} {...props}>
            <IconButton>
                {Globals.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            {children}
        </Button>
    );
}