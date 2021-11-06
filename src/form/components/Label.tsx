import React from 'react';
import { styled } from '@material-ui/core';
import { RequiredSpan } from './FormHelpers';
import { trans } from './../../localization';
import config from './../../config';

const FormLabel = styled('label')({
    display: 'inline-block',
    fontWeight: 'bold',
});

export type LabelProps = {
    label?: string | React.ReactNode;
    required?: boolean;
    component?: React.FC;
    children?: React.ReactNode;
    htmlFor?: string;
    [id: string]: any;
}

export default function Label(props: LabelProps) {
    let { label, children, component: Component = config.get('form.input.label', FormLabel), required, ...otherProps } = props;

    if (!label && ! children) return null;

    return (
        <Component {...otherProps}>
            {typeof label === 'string' && trans(label)}
            {typeof label !== 'string' && (children || label)}
            <RequiredSpan required={required} />
        </Component>
    )
}