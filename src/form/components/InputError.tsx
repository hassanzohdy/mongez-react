import clsx from 'clsx';
import React from 'react';
import { Label } from 'semantic-ui-react';
import { makeStyles } from '@material-ui/core';
import config from '../../config';

const useStyle = makeStyles((theme) => ({
    error: {
        color: '#F00',
        fontSize: '0.75rem',
        fontWeight: 400,
        marginTop: theme.spacing(0.8),
        textAlign: 'left',
    }
}));

export type InputErrorProps = {
    error: React.ReactNode;
    classes?: {
        errorMessage?: string;
    };
    pointing?: boolean | 'above' | 'below' | 'left' | 'right';
}

export default function InputError({ error, classes, pointing = 'below' }: InputErrorProps) {
    const internalClasses = useStyle();

    const className = React.useMemo(() => clsx(
        internalClasses.error,
        classes && classes.errorMessage,
        config.get('form.input.classes.errorMessage')
    ), [classes, internalClasses]);

    if (!error) return null;

    return (
        <Label basic className={className} color='red' pointing={pointing}>
            {error}
        </Label>
    )
}

