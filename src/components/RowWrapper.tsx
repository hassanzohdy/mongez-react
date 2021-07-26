import React from 'react';
import Is from '@flk/supportive-is';
import { Random } from 'reinforcements';

function uniqueId(item) {
    if (Is.scalar(item)) return item;
    if (!item.uid) {
        item.uid = Random.id();
    }

    return item.uid;
}

export interface RowWrapperProps {
    component?: React.FC | React.ComponentClass;
    item: any;
    children: React.ReactNode | React.ReactNode[];
    [key: string]: any;
}

export default function RowWrapper(props: RowWrapperProps) {
    const { component: Component = React.Fragment, item, children, ...otherProps } = props;

    return <Component key={uniqueId(item)} children={children} {...otherProps} />
}