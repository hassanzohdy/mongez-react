import React from 'react';
import { styled } from '@material-ui/core';
import { RequiredSpan } from './FormHelpers';
import { trans } from './../../localization';

const FormLabel = styled('span')({
    display: 'inline-block',
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
    let { label, children, component: Component, required, ...otherProps } = props;

    if (!label && ! children) return null;

    return (
        <Component {...otherProps}>
            {typeof label === 'string' && trans(label)}
            {typeof label !== 'string' && (children || label)}
            <RequiredSpan required={required} />
        </Component>
    )
}

Label.defaultProps = {
    component: FormLabel,
}